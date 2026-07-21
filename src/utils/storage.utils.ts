import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_access_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';
const USER_KEY = 'auth_user';

export interface StoredTokens {
  accessToken: string;
  refreshToken: string;
}

export interface StoredUser {
  id: string;
  email: string;
  fullName: string;
  organizationId: string;
}

/**
 * Guarda tokens de forma segura usando expo-secure-store
 */
export const saveTokens = async (tokens: StoredTokens): Promise<void> => {
  try {
    await Promise.all([
      SecureStore.setItemAsync(TOKEN_KEY, tokens.accessToken),
      SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refreshToken),
    ]);
  } catch (error) {
    console.error('[StorageUtils] Error saving tokens:', error);
    throw new Error('Failed to save tokens');
  }
};

/**
 * Obtiene tokens almacenados de forma segura
 */
export const getTokens = async (): Promise<StoredTokens | null> => {
  try {
    const [accessToken, refreshToken] = await Promise.all([
      SecureStore.getItemAsync(TOKEN_KEY),
      SecureStore.getItemAsync(REFRESH_TOKEN_KEY),
    ]);

    if (!accessToken || !refreshToken) {
      return null;
    }

    return { accessToken, refreshToken };
  } catch (error) {
    console.error('[StorageUtils] Error retrieving tokens:', error);
    return null;
  }
};

/**
 * Obtiene solo el access token
 */
export const getAccessToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error('[StorageUtils] Error retrieving access token:', error);
    return null;
  }
};

/**
 * Obtiene solo el refresh token
 */
export const getRefreshToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error('[StorageUtils] Error retrieving refresh token:', error);
    return null;
  }
};

/**
 * Elimina todos los tokens de forma segura
 */
export const clearTokens = async (): Promise<void> => {
  try {
    await Promise.all([
      SecureStore.deleteItemAsync(TOKEN_KEY),
      SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
    ]);
  } catch (error) {
    console.error('[StorageUtils] Error clearing tokens:', error);
    // No lanzar error porque no queremos que logout falle
  }
};

/**
 * Guarda datos del usuario en localStorage (no sensitivo)
 */
export const saveUser = async (user: StoredUser): Promise<void> => {
  try {
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('[StorageUtils] Error saving user:', error);
  }
};

/**
 * Obtiene datos del usuario
 */
export const getUser = async (): Promise<StoredUser | null> => {
  try {
    const userJson = await SecureStore.getItemAsync(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('[StorageUtils] Error retrieving user:', error);
    return null;
  }
};

/**
 * Elimina datos del usuario
 */
export const clearUser = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(USER_KEY);
  } catch (error) {
    console.error('[StorageUtils] Error clearing user:', error);
  }
};

/**
 * Limpia toda la sesión (tokens + usuario)
 */
export const clearSession = async (): Promise<void> => {
  await Promise.all([clearTokens(), clearUser()]);
};
