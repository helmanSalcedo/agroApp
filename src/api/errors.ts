import { AxiosError } from 'axios';

export class ApiError extends Error {
  constructor(
    public code: string,
    public statusCode: number,
    message: string,
    public originalError?: AxiosError,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export type ErrorResponse = {
  message: string;
  statusCode: number;
  error?: string;
  details?: Record<string, any>;
};

export const normalizeError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ErrorResponse | undefined;
    const statusCode = error.response?.status ?? 0;
    const message = data?.message ?? error.message ?? 'Unknown error occurred';
    const code = data?.error ?? 'UNKNOWN_ERROR';

    return new ApiError(code, statusCode, message, error);
  }

  if (error instanceof Error) {
    return new ApiError('CLIENT_ERROR', 0, error.message);
  }

  return new ApiError('UNKNOWN_ERROR', 0, 'An unexpected error occurred');
};

export const isNetworkError = (error: ApiError): boolean => {
  return error.originalError?.code === 'ERR_NETWORK' || error.statusCode === 0;
};

export const isUnauthorized = (error: ApiError): boolean => {
  return error.statusCode === 401;
};

export const isRefreshTokenExpired = (error: ApiError): boolean => {
  return error.statusCode === 401 && error.code === 'INVALID_REFRESH_TOKEN';
};

export const getUserFriendlyMessage = (error: ApiError): string => {
  const messages: Record<string, string> = {
    ERR_NETWORK: 'No internet connection. Please check your network.',
    INVALID_CREDENTIALS: 'Invalid email or password.',
    USER_NOT_FOUND: 'User account not found.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    FORBIDDEN: 'Access denied.',
    UNKNOWN_ERROR: 'Something went wrong. Please try again.',
  };

  if (isNetworkError(error)) {
    return messages.ERR_NETWORK;
  }

  return messages[error.code] || error.message || messages.UNKNOWN_ERROR;
};
