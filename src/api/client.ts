import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, getRefreshToken, saveTokens, clearSession } from '@/utils/storage.utils';
import { ApiError, normalizeError } from './errors';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000';
const API_TIMEOUT = parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || '30000', 10);
const DEBUG = process.env.EXPO_PUBLIC_DEBUG === 'true';

// Estado para prevenir múltiples refresh simultáneos
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: ApiError) => void;
}> = [];

const processQueue = (error: ApiError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });

  isRefreshing = false;
  failedQueue = [];
};

export class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Interceptor de request
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const token = await getAccessToken();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        if (DEBUG) {
          console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
        }

        return config;
      },
      (error) => {
        return Promise.reject(normalizeError(error));
      },
    );

    // Interceptor de response
    this.instance.interceptors.response.use(
      (response) => {
        if (DEBUG) {
          console.log(`[API] ✅ ${response.status} ${response.config.url}`);
        }
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        if (!originalRequest) {
          return Promise.reject(normalizeError(error));
        }

        // Si es 401 y no es un retry, intentar refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (isRefreshing) {
            // Ya hay un refresh en progreso, poner en cola
            return new Promise((resolve, reject) => {
              failedQueue.push({
                resolve: (token: string) => {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                  resolve(this.instance(originalRequest));
                },
                reject: (err: ApiError) => {
                  reject(err);
                },
              });
            });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const refreshToken = await getRefreshToken();

            if (!refreshToken) {
              throw new ApiError(
                'NO_REFRESH_TOKEN',
                401,
                'No refresh token available',
              );
            }

            const response = await this.instance.post('/auth/refresh', {
              refreshToken,
            });

            const { accessToken, refreshToken: newRefreshToken } = response.data;

            await saveTokens({
              accessToken,
              refreshToken: newRefreshToken,
            });

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            processQueue(null, accessToken);

            return this.instance(originalRequest);
          } catch (refreshError) {
            const apiError = normalizeError(refreshError);
            processQueue(apiError, null);

            // Logout
            await clearSession();

            return Promise.reject(apiError);
          }
        }

        return Promise.reject(normalizeError(error));
      },
    );
  }

  getInstance(): AxiosInstance {
    return this.instance;
  }

  setBaseURL(url: string): void {
    this.instance.defaults.baseURL = url;
  }

  getBaseURL(): string {
    return this.instance.defaults.baseURL || API_BASE_URL;
  }
}

export const apiClient = new ApiClient();
export const apiInstance = apiClient.getInstance();
