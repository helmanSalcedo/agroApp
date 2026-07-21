import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AuthService } from '@/services/auth.service';
import {
  AuthState,
  UserDto,
  OrganizationDto,
  LoginRequest,
  RegisterRequest,
  AuthResponseDto,
} from '@/types/auth.types';
import {
  saveTokens,
  clearSession,
  saveUser,
  getTokens,
  getUser,
  clearUser,
} from '@/utils/storage.utils';
import { normalizeError, ApiError, isRefreshTokenExpired } from '@/api/errors';

/**
 * Zustand Auth Store - Gestión centralizada del estado de autenticación
 *
 * Por qué Zustand vs Redux Toolkit:
 * - Más ligero (bundle size)
 * - API más simple y menos boilerplate
 * - Mejor para React Native
 * - No necesita Context API
 * - Performance similar o mejor
 */

interface AuthStoreActions {
  // Actions
  login: (payload: LoginRequest) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: (refreshToken: string) => Promise<void>;
  restoreSession: () => Promise<void>;
  switchOrganization: (organizationId: string) => Promise<void>;
  setUser: (user: UserDto | null) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type AuthStore = AuthState & AuthStoreActions;

const initialState: AuthState = {
  user: null,
  activeOrganization: null,
  organizations: [],
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

/**
 * Hook de Zustand para autenticación
 */
export const useAuthStore = create<AuthStore>()(
  immer((set) => ({
    ...initialState,

    // ========== LOGIN ==========
    login: async (payload: LoginRequest) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const response = await AuthService.login(payload);
        _setAuthResponse(set, response);
      } catch (error) {
        const apiError = error instanceof ApiError ? error : normalizeError(error);
        set((state) => {
          state.error = apiError.message;
          state.isLoading = false;
        });
        throw apiError;
      }
    },

    // ========== REGISTER ==========
    register: async (payload: RegisterRequest) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const response = await AuthService.register(payload);
        _setAuthResponse(set, response);
      } catch (error) {
        const apiError = error instanceof ApiError ? error : normalizeError(error);
        set((state) => {
          state.error = apiError.message;
          state.isLoading = false;
        });
        throw apiError;
      }
    },

    // ========== LOGOUT ==========
    logout: async () => {
      set((state) => {
        state.isLoading = true;
      });

      try {
        // Intentar notificar al backend, pero no fallar si no se puede
        try {
          await AuthService.logout();
        } catch (error) {
          console.warn('[AuthStore] Error notifying logout to backend:', error);
        }

        // Limpiar estado local
        await clearSession();
        set((state) => {
          state.user = null;
          state.activeOrganization = null;
          state.organizations = [];
          state.accessToken = null;
          state.refreshToken = null;
          state.isAuthenticated = false;
          state.isLoading = false;
          state.error = null;
        });
      } catch (error) {
        console.error('[AuthStore] Logout error:', error);
        // Limpiar de todas formas
        await clearSession();
        set((state) => {
          state.isAuthenticated = false;
          state.isLoading = false;
        });
      }
    },

    // ========== REFRESH TOKEN ==========
    refreshAccessToken: async (refreshToken: string) => {
      try {
        const response = await AuthService.refreshToken({ refreshToken });
        _setAuthResponse(set, response);
      } catch (error) {
        const apiError = error instanceof ApiError ? error : normalizeError(error);

        // Si el refresh token expiró, hacer logout
        if (isRefreshTokenExpired(apiError)) {
          await useAuthStore.getState().logout();
        }

        throw apiError;
      }
    },

    // ========== RESTORE SESSION ==========
    /**
     * Restaurar sesión al iniciar la app
     * Intenta cargar tokens y usuario del almacenamiento seguro
     */
    restoreSession: async () => {
      set((state) => {
        state.isLoading = true;
      });

      try {
        const tokens = await getTokens();
        const user = await getUser();

        if (tokens && user) {
          set((state) => {
            state.accessToken = tokens.accessToken;
            state.refreshToken = tokens.refreshToken;
            state.user = user;
            state.isAuthenticated = true;
            state.isLoading = false;
          });

          // Validar que el token aún sea válido
          try {
            await AuthService.getMe();
          } catch (error) {
            // Token inválido, hacer logout silencioso
            await useAuthStore.getState().logout();
          }
        } else {
          set((state) => {
            state.isLoading = false;
          });
        }
      } catch (error) {
        console.error('[AuthStore] Error restoring session:', error);
        set((state) => {
          state.isLoading = false;
        });
      }
    },

    // ========== SWITCH ORGANIZATION ==========
    switchOrganization: async (organizationId: string) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const response = await AuthService.switchOrganization(organizationId);
        _setAuthResponse(set, response);
      } catch (error) {
        const apiError = error instanceof ApiError ? error : normalizeError(error);
        set((state) => {
          state.error = apiError.message;
          state.isLoading = false;
        });
        throw apiError;
      }
    },

    // ========== UTILITIES ==========
    setUser: (user: UserDto | null) => {
      set((state) => {
        state.user = user;
      });
    },

    setError: (error: string | null) => {
      set((state) => {
        state.error = error;
      });
    },

    clearError: () => {
      set((state) => {
        state.error = null;
      });
    },
  })),
);

/**
 * Función helper para establecer respuesta de auth
 */
async function _setAuthResponse(
  set: any,
  response: AuthResponseDto,
): Promise<void> {
  const { accessToken, refreshToken, user, activeOrganization, organizations } = response;

  // Guardar en almacenamiento seguro
  await saveTokens({ accessToken, refreshToken });
  await saveUser({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    organizationId: activeOrganization.id,
  });

  // Actualizar store
  set((state: AuthState) => {
    state.accessToken = accessToken;
    state.refreshToken = refreshToken;
    state.user = user;
    state.activeOrganization = activeOrganization;
    state.organizations = organizations;
    state.isAuthenticated = true;
    state.isLoading = false;
    state.error = null;
  });
}

/**
 * Selector para obtener si el usuario está autenticado
 */
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);

/**
 * Selector para obtener el usuario actual
 */
export const useAuthUser = () => useAuthStore((state) => state.user);

/**
 * Selector para obtener la organización activa
 */
export const useActiveOrganization = () =>
  useAuthStore((state) => state.activeOrganization);

/**
 * Selector para obtener el token de acceso
 */
export const useAccessToken = () => useAuthStore((state) => state.accessToken);

/**
 * Selector para obtener el estado de carga
 */
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);

/**
 * Selector para obtener el error de autenticación
 */
export const useAuthError = () => useAuthStore((state) => state.error);
