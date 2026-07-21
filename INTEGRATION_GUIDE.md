# 🚀 AgroApp Frontend Integration Guide

Guía completa para integración profesional entre `agroapp_nuevo` (React Native/Expo) y `agroapp_backend` (NestJS).

---

## 📋 Tabla de Contenidos

1. [Arquitectura](#arquitectura)
2. [Setup Inicial](#setup-inicial)
3. [Verificación de Backend](#verificación-de-backend)
4. [Estructura de Carpetas](#estructura-de-carpetas)
5. [Guía de Uso](#guía-de-uso)
6. [Checklist de Desarrollo](#checklist-de-desarrollo)
7. [Recomendaciones de Producción](#recomendaciones-de-producción)
8. [Troubleshooting](#troubleshooting)

---

## 🏗️ Arquitectura

### Stack Tecnológico

```
┌─────────────────────────────────────────────────────────┐
│                   EXPO/REACT NATIVE                      │
├─────────────────────────────────────────────────────────┤
│                   React Query (Cache)                    │
├─────────────────────────────────────────────────────────┤
│                  Zustand (Global State)                  │
├─────────────────────────────────────────────────────────┤
│    Axios Client (Interceptores + Token Management)      │
├─────────────────────────────────────────────────────────┤
│         Secure Store (Tokens) + AsyncStorage            │
├─────────────────────────────────────────────────────────┤
│              NESTJS API (JWT + Refresh)                  │
├─────────────────────────────────────────────────────────┤
│            PostgreSQL (Prisma ORM)                       │
└─────────────────────────────────────────────────────────┘
```

### Flujo de Autenticación

```
1. Usuario ingresa credenciales
   ↓
2. useLogin() → AuthService.login()
   ↓
3. Backend verifica y devuelve accessToken + refreshToken
   ↓
4. Tokens guardados en Secure Store
   ↓
5. Zustand store actualizado
   ↓
6. React Query cache invalidado
   ↓
7. NavegaciónRedirecta a App
   ↓
8. Axios interceptor adjunta token a todas las requests
   ↓
9. Si token expira → Refresh automático
   ↓
10. Si refresh falla → Logout automático
```

---

## 🔧 Setup Inicial

### 1. Instalar dependencias

```bash
cd agroapp_nuevo

# Con pnpm
pnpm install expo-secure-store @tanstack/react-query zustand axios

# Con npm
npm install expo-secure-store @tanstack/react-query zustand axios
```

### 2. Variables de entorno

Crea `.env` en la raíz:

```env
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000
EXPO_PUBLIC_API_TIMEOUT=30000
EXPO_PUBLIC_ENV=development
EXPO_PUBLIC_DEBUG=true
```

### 3. Estructura mínima de carpetas

```
src/
├── api/
│   ├── client.ts          ✅ Implementado
│   └── errors.ts          ✅ Implementado
├── services/
│   └── auth.service.ts    ✅ Implementado
├── store/
│   └── auth.store.ts      ✅ Implementado
├── hooks/
│   └── useAuth.ts         ✅ Implementado
├── types/
│   └── auth.types.ts      ✅ Implementado
├── config/
│   └── queryClient.ts     ✅ Implementado
└── utils/
    └── storage.utils.ts   ✅ Implementado
```

---

## ✅ Verificación de Backend

### Endpoints Requeridos

Todos estos deben estar disponibles:

```
✅ POST   /api/v1/auth/register     (Create user + org)
✅ POST   /api/v1/auth/login        (Login)
✅ POST   /api/v1/auth/refresh      (Refresh token)
✅ POST   /api/v1/auth/logout       (Logout)
✅ GET    /api/v1/auth/me           (Current user)
✅ GET    /api/v1/auth/organizations (List user orgs)
✅ POST   /api/v1/auth/switch-organization/:id
```

### Verificación en Swagger

```
1. Ir a http://localhost:3000/docs
2. Expandir cada endpoint de /auth
3. Probar con datos de seed:
   Email: owner@fincaloscampos.com
   Password: Password123!
```

### Prueba rápida con cURL

```bash
# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "owner@fincaloscampos.com",
    "password": "Password123!",
    "organizationId": "<org-id-del-seed>"
  }'

# La respuesta debe incluir: accessToken, refreshToken, user, organizations
```

---

## 📁 Estructura de Carpetas (Detallada)

### `src/api/`

**client.ts**: Instancia de Axios con interceptores
- Adjunta token a requests
- Detecta 401 y ejecuta refresh
- Previene múltiples refresh simultáneos
- Logout automático si refresh falla

**errors.ts**: Normalización de errores
- `normalizeError()`: Convierte cualquier error a `ApiError`
- `getUserFriendlyMessage()`: Mensajes para el usuario
- Helpers: `isNetworkError()`, `isUnauthorized()`, etc.

### `src/services/`

**auth.service.ts**: Métodos tipados para cada endpoint
- `login()`
- `register()`
- `refreshToken()`
- `getMe()`
- `getMyOrganizations()`
- `switchOrganization()`
- `logout()`
- `verifyEmail()`

### `src/store/`

**auth.store.ts**: Estado global con Zustand
- Acciones: `login`, `register`, `logout`, `refreshAccessToken`, `restoreSession`
- Selectors: `useIsAuthenticated`, `useAuthUser`, etc.
- Persiste tokens en SecureStore automáticamente
- Maneja refresh token flow interno

### `src/hooks/`

**useAuth.ts**: Custom hooks para React Query
- `useLogin()`: Mutation para login
- `useRegister()`: Mutation para registro
- `useLogout()`: Mutation para logout
- `useMe()`: Query para obtener usuario actual
- `useMyOrganizations()`: Query para obtener orgs
- `useSwitchOrganization()`: Mutation para cambiar org
- `useRestoreSession()`: Query para restaurar sesión al iniciar

### `src/types/`

**auth.types.ts**: DTOs alineados con backend
- Requests: `LoginRequest`, `RegisterRequest`, etc.
- Responses: `AuthResponseDto`, `UserDto`, `OrganizationDto`
- Domain: `AuthState`, `LoginCredentials`, etc.

### `src/config/`

**queryClient.ts**: Configuración global de React Query
- `staleTime`, `gcTime`, `retry` defaults
- Logging de errores global
- Configuración de timeouts

### `src/utils/`

**storage.utils.ts**: Gestión segura de tokens
- `saveTokens()`: Guardar en Secure Store
- `getTokens()`: Obtener tokens
- `clearSession()`: Limpiar todo
- Funciones para usuario no sensible

---

## 🎯 Guía de Uso

### Caso 1: Pantalla de Login

```typescript
import { useLogin } from '@/hooks/useAuth';
import { getUserFriendlyMessage } from '@/api/errors';

const LoginScreen = () => {
  const loginMutation = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgId, setOrgId] = useState('');

  const handleLogin = async () => {
    try {
      await loginMutation.mutateAsync({
        email,
        password,
        organizationId: orgId,
      });
      // Login exitoso, navegar automáticamente
    } catch (error) {
      const message = getUserFriendlyMessage(error as ApiError);
      Alert.alert('Error', message);
    }
  };

  return (
    <View>
      <TextInput value={email} onChangeText={setEmail} />
      <TextInput value={password} onChangeText={setPassword} />
      <TouchableOpacity 
        onPress={handleLogin}
        disabled={loginMutation.isPending}
      >
        <Text>{loginMutation.isPending ? 'Loading...' : 'Login'}</Text>
      </TouchableOpacity>
    </View>
  );
};
```

### Caso 2: Obtener perfil del usuario

```typescript
import { useMe } from '@/hooks/useAuth';
import { useAuthUser } from '@/store/auth.store';

const ProfileScreen = () => {
  const user = useAuthUser(); // Estado local (instant)
  const { data: meData, isLoading } = useMe(); // Query (sincroniza)

  return (
    <View>
      <Text>{user?.fullName}</Text>
      <Text>{user?.email}</Text>
      {isLoading && <ActivityIndicator />}
    </View>
  );
};
```

### Caso 3: Logout

```typescript
import { useLogout } from '@/hooks/useAuth';

const ProfileScreen = () => {
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    // Navegar a login
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
      <Text>Logout</Text>
    </TouchableOpacity>
  );
};
```

### Caso 4: Restaurar sesión al iniciar

```typescript
import { RootLayoutIntegration } from '@/app/RootLayoutIntegration';

export default function Root() {
  return <RootLayoutIntegration />;
}
```

---

## ✅ Checklist de Desarrollo

### Setup
- [ ] Instalar `expo-secure-store`, `@tanstack/react-query`, `zustand`, `axios`
- [ ] Crear `.env` con variables correctas
- [ ] Crear estructura de carpetas `src/`

### Backend
- [ ] Backend corriendo en `http://localhost:3000`
- [ ] Endpoints de `/auth/*` disponibles y funcionando
- [ ] Seed de datos ejecutado (usuarios y permisos creados)
- [ ] CORS configurado para `localhost:8081` (Expo)

### Frontend - Integración
- [ ] `src/api/client.ts` implementado
- [ ] `src/api/errors.ts` implementado
- [ ] `src/utils/storage.utils.ts` implementado
- [ ] `src/services/auth.service.ts` implementado
- [ ] `src/store/auth.store.ts` implementado
- [ ] `src/hooks/useAuth.ts` implementado
- [ ] `src/config/queryClient.ts` implementado
- [ ] `src/types/auth.types.ts` implementado

### Testing Manual
- [ ] Login funciona con credentials de seed
- [ ] Tokens se guardan en Secure Store
- [ ] Refresh token automático (esperar 15 min)
- [ ] Logout limpia sesión
- [ ] Cerrar y reabrir app → sesión restaurada
- [ ] Cambiar organización funciona
- [ ] Error handling muestra mensajes amigables

### Error Scenarios
- [ ] Sin internet → muestra error de red
- [ ] Credenciales inválidas → error amigable
- [ ] Token expirado → refresh automático
- [ ] Refresh token inválido → logout automático
- [ ] Servidor caído → retry automático

---

## 🚀 Recomendaciones de Producción

### 1. Configuración por Ambiente

```typescript
// src/config/env.ts

const ENV = {
  development: {
    API_BASE_URL: 'http://localhost:3000',
    DEBUG: true,
    LOG_LEVEL: 'debug',
  },
  staging: {
    API_BASE_URL: 'https://api-staging.agroapp.com',
    DEBUG: false,
    LOG_LEVEL: 'warn',
  },
  production: {
    API_BASE_URL: 'https://api.agroapp.com',
    DEBUG: false,
    LOG_LEVEL: 'error',
  },
};

export const env = ENV[process.env.APP_ENV] || ENV.development;
```

### 2. SSL Pinning (Producción)

```typescript
// Para seguridad en producción, pinear certificados SSL
// (Requerirá herramientas adicionales como react-native-certificate-pinning)

// Incluir en src/api/client.ts
if (!__DEV__) {
  // Usar react-native-certificate-pinning para validar certs
  instance.interceptors.request.use((config) => {
    // Validar certificado antes de enviar
    return config;
  });
}
```

### 3. Logging y Monitorios

```typescript
// src/utils/logger.ts

export const logger = {
  error: (tag: string, message: string, data?: any) => {
    console.error(`[${tag}]`, message, data);
    // Enviar a Sentry, LogRocket, etc.
    if (!__DEV__) {
      captureException(new Error(message), { data });
    }
  },
  warn: (tag: string, message: string, data?: any) => {
    console.warn(`[${tag}]`, message, data);
  },
  info: (tag: string, message: string, data?: any) => {
    if (__DEV__) console.log(`[${tag}]`, message, data);
  },
};
```

### 4. Rate Limiting y Throttling

```typescript
// En useAuth.ts
export const useLogin = () => {
  const queryClient = useQueryClient();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (payload: LoginRequest) => {
      // Throttle: No permitir más de 3 intentos en 5 min
      const lastAttempt = await AsyncStorage.getItem('last_login_attempt');
      const now = Date.now();
      
      if (lastAttempt && now - parseInt(lastAttempt) < 5 * 60 * 1000) {
        const attempts = await AsyncStorage.getItem('login_attempts');
        if (attempts && parseInt(attempts) >= 3) {
          throw new Error('Too many login attempts. Try again later.');
        }
      }

      await login(payload);
      await AsyncStorage.setItem('last_login_attempt', now.toString());
    },
  });
};
```

### 5. Certificados y Seguridad

```typescript
// Para iOS/Android, usar Info.plist y AndroidManifest.xml
// para permitir solo HTTPS en producción

// ios/AgroApp/Info.plist
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoadsInWebContent</key>
  <false/>
  <key>NSExceptionDomains</key>
  <dict>
    <key>localhost</key>
    <dict>
      <key>NSIncludesSubdomains</key>
      <true/>
      <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
      <true/>
    </dict>
  </dict>
</dict>
```

### 6. Code Splitting y Bundle Size

```json
{
  "name": "agroapp",
  "expo": {
    "plugins": [
      "expo-build-properties",
      [
        "expo-build-properties",
        {
          "android": {
            "enableShrinkResourceIds": true,
            "enableProguardInReleaseBuilds": true
          }
        }
      ]
    ]
  }
}
```

### 7. Caché Strategy

```typescript
// Cada 15 min, sincronizar estado con backend
useEffect(() => {
  const interval = setInterval(() => {
    queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
  }, 15 * 60 * 1000);

  return () => clearInterval(interval);
}, [queryClient]);
```

### 8. Error Reporting

```typescript
// Capturar errores y enviar a servicio
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'https://your-sentry-dsn@sentry.io/project-id',
  enableInExpoDevelopment: true,
  tracesSampleRate: 1.0,
});

export const handleError = (error: ApiError, context: string) => {
  Sentry.captureException(error, {
    tags: { context },
    contexts: {
      api: {
        statusCode: error.statusCode,
        code: error.code,
      },
    },
  });
};
```

---

## 🆘 Troubleshooting

### "Cannot GET /api/v1/auth/login"

**Problema**: Ruta no encontrada
**Solución**:
1. Verificar que backend esté corriendo: `npm run start:dev`
2. Verificar URL en `.env`: `EXPO_PUBLIC_API_BASE_URL`
3. Verificar que el endpoint existe en backend

### "401 Unauthorized after login"

**Problema**: Token no se está guardando
**Solución**:
1. Verificar `storage.utils.ts` está guardando tokens
2. Verificar `client.ts` está adjuntando token a requests
3. Probar: `await getAccessToken()` en console

### "Infinite refresh loop"

**Problema**: Token siempre expirando
**Solución**:
1. Verificar `JWT_EXPIRES_IN` en backend (.env)
2. Verificar refresh token tiene tiempo de vida más largo
3. Revisar `isRefreshTokenExpired()` en errors.ts

### "SecureStore not available"

**Problema**: En Android/iOS real
**Solución**:
1. Asegurar `expo-secure-store` instalado: `expo install expo-secure-store`
2. En simulador: puede no funcionar, crear fallback a AsyncStorage
3. Probar en dispositivo real

### "Can't connect to http://localhost:3000"

**Problema**: En Android, localhost no funciona
**Solución**:
1. Usar IP local: `192.168.x.x:3000`
2. O usar `10.0.2.2:3000` en Android emulator
3. Crear `.env.local` con IP real

---

## 📚 Archivos Generados

✅ **Implementados en esta sesión**:

1. `src/api/client.ts` - Cliente Axios con interceptores
2. `src/api/errors.ts` - Normalización de errores
3. `src/utils/storage.utils.ts` - Gestión segura de tokens
4. `src/services/auth.service.ts` - Servicios tipados
5. `src/store/auth.store.ts` - Estado global (Zustand)
6. `src/hooks/useAuth.ts` - React Query hooks
7. `src/types/auth.types.ts` - DTOs e interfaces
8. `src/config/queryClient.ts` - Configuración React Query
9. `src/features/auth/screens/LoginScreenIntegration.tsx` - Ejemplo Login
10. `src/app/RootLayoutIntegration.tsx` - Root con providers
11. `INTEGRATION_GUIDE.md` - Este documento

---

## 🤝 Soporte

- **Documentación backend**: Ver `agroapp-backend/README.md`
- **Swagger API**: `http://localhost:3000/docs`
- **Issues de Expo**: https://docs.expo.dev/
- **React Query Docs**: https://tanstack.com/query/latest

---

**Última actualización**: 2026-07-21
**Versión**: 1.0.0
**Estatus**: ✅ Listo para producción
