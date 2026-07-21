# ✅ Backend Checklist para Integración Mobile

Verificación de que el backend NestJS está correctamente configurado para la app móvil.

---

## 🔐 Autenticación & Seguridad

### Endpoints de Auth

- [x] `POST /auth/register` - Crear usuario + organización
  - ✅ Implementado en backend
  - ✅ Crea automáticamente organización
  - ✅ Devuelve `accessToken` + `refreshToken`

- [x] `POST /auth/login` - Login con email/contraseña
  - ✅ Implementado en backend
  - ✅ Devuelve tokens + usuario + organizaciones

- [x] `POST /auth/refresh` - Refrescar access token
  - ✅ Implementado en backend
  - ✅ Devuelve nuevo `accessToken`

- [x] `POST /auth/logout` - Cerrar sesión
  - ✅ Implementado en backend
  - ✅ Revoca sesión en BD

- [x] `GET /auth/me` - Obtener usuario actual
  - ✅ Implementado en backend
  - ✅ Requiere Bearer token

- [x] `GET /auth/organizations` - Listar organizaciones del usuario
  - ✅ Implementado en backend
  - ✅ Devuelve array de organizaciones

- [x] `POST /auth/switch-organization/:id` - Cambiar org activa
  - ✅ Implementado en backend
  - ✅ Devuelve nuevo contexto de auth

### JWT Configuration

- [x] `JWT_SECRET` configurado (`.env`)
- [x] `JWT_EXPIRES_IN` = `15m` (acceso corto)
- [x] `JWT_REFRESH_EXPIRES_IN` = `7d` (refresh largo)
- [x] Tokens incluyen: `sub` (user_id), `email`, `organizationId`, `tenantId`

### Headers & CORS

- [x] CORS habilitado para Expo
  - Necesario para `http://localhost:8081` (Expo dev)
  - Producción: configurar para dominio real

- [x] Headers de seguridad (Helmet)
  - Content-Security-Policy
  - X-Frame-Options: SAMEORIGIN
  - X-Content-Type-Options: nosniff

### Password Security

- [x] Passwords hasheadas con bcrypt (salt: 10 rounds)
- [x] Validación de longitud mínima (12 caracteres)
- [x] No se devuelven passwords en responses

---

## 📊 Estructura de Datos

### Modelos Requeridos

- [x] `User`
  - id (UUID)
  - email (unique)
  - fullName, firstName, lastName
  - phone
  - isVerifiedEmail
  - createdAt, updatedAt

- [x] `Organization`
  - id (UUID)
  - name
  - slug (unique per tenant)
  - tenantId (multitenancy)
  - subscriptionPlan
  - isActive
  - createdAt, updatedAt

- [x] `OrganizationMember`
  - userId
  - organizationId
  - isOwner
  - invitedAt

- [x] `Session`
  - userId
  - organizationId
  - accessTokenHash
  - refreshTokenHash
  - expiresAt
  - isActive

- [x] `RefreshToken`
  - userId
  - token
  - expiresAt
  - revokedAt

- [x] `Farm` (módulo de negocio)
  - organizationId (multitenancy)
  - name, slug
  - description, location
  - totalAreaHa
  - industryType
  - isActive
  - createdAt, updatedAt

- [x] `Role`
  - organizationId
  - name, slug
  - isSystem (Owner, Admin, Supervisor, Worker)
  - permissions (M2M con Permission)

- [x] `Permission`
  - name, slug
  - category, action, resource
  - ejemplo: FARM_CREATE, FARM_VIEW, FARM_UPDATE, FARM_DELETE

### Relaciones Críticas

- [x] User → OrganizationMember → Organization (M2M)
- [x] User → UserRole → Role (M2M per organization)
- [x] Role → RolePermission → Permission (M2M)
- [x] Session → User (1:N, soft delete)
- [x] Farm → Organization (N:1, no se elimina org si hay farms)

---

## 🔄 Flujos de Autenticación

### Login Flow

1. [x] Cliente envía: `{ email, password, organizationId }`
2. [x] Backend verifica credenciales
3. [x] Backend verifica que usuario sea miembro de org
4. [x] Backend crea sesión (OAuth2-like)
5. [x] Backend devuelve:
   ```json
   {
     "accessToken": "...",
     "refreshToken": "...",
     "expiresIn": 900,
     "user": {...},
     "organizations": [...],
     "activeOrganization": {...}
   }
   ```

### Token Refresh Flow

1. [x] Cliente detecta 401 en response
2. [x] Cliente envía `POST /auth/refresh` con refreshToken
3. [x] Backend valida refreshToken
4. [x] Backend genera nuevo accessToken
5. [x] Backend devuelve nuevo token
6. [x] Cliente reintenta request original
7. [x] Si refresh falla → logout automático

### Logout Flow

1. [x] Cliente envía `POST /auth/logout` con Bearer token
2. [x] Backend marca sesión como inactiva (soft delete)
3. [x] Backend revoca refreshTokens
4. [x] Cliente limpia tokens locales
5. [x] Cliente navega a login

### Session Restoration Flow

1. [x] App abre
2. [x] Cliente busca tokens en SecureStore
3. [x] Si existen → intenta validar con `GET /auth/me`
4. [x] Si válido → restaurar sesión automáticamente
5. [x] Si inválido → mostrar login

---

## 📝 Validaciones

### Request Validation

- [x] Email válido (formato RFC)
- [x] Password mínimo 8-12 caracteres
- [x] organizationId es UUID válido
- [x] Nombres no vacíos

### Response Validation

- [x] Siempre devolver `{ data, error }` o similar
- [x] Status codes correctos:
  - 200: OK
  - 201: Created
  - 400: Bad Request
  - 401: Unauthorized
  - 403: Forbidden
  - 404: Not Found
  - 409: Conflict (user exists)
  - 500: Server Error

### Multitenancy Validation

- [x] Usuario solo accede datos de su org
  - Query filters incluyen `organizationId`
  - No exponer datos de otras orgs

- [x] No permitir acceso a org si no es miembro
  - Verificar `organizationMember` antes de devolver datos

---

## 📱 Formato de Respuestas

### Success Response

```json
{
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "a7f3e2c1...",
    "user": {
      "id": "550e8400...",
      "email": "user@example.com",
      "fullName": "John Doe",
      "isVerifiedEmail": true
    },
    "organizations": [
      {
        "id": "550e8401...",
        "name": "Finca Los Campos",
        "slug": "finca-los-campos",
        "subscriptionPlan": "PROFESSIONAL",
        "isActive": true
      }
    ]
  }
}
```

### Error Response

```json
{
  "error": "INVALID_CREDENTIALS",
  "message": "Invalid email or password",
  "statusCode": 401,
  "timestamp": "2026-07-21T12:00:00Z"
}
```

---

## 🧪 Seed de Datos

### Ejecutar Seed

```bash
cd agroapp-backend
npm run prisma:seed
```

### Datos Creados

✅ **17 Permisos** del sistema
✅ **4 Roles** (Owner, Admin, Supervisor, Worker)
✅ **1 Organización** (Finca Los Campos)
✅ **4 Usuarios** de prueba:

| Email | Password | Rol |
|-------|----------|-----|
| owner@fincaloscampos.com | Password123! | Owner |
| admin@fincaloscampos.com | Password123! | Admin |
| supervisor@fincaloscampos.com | Password123! | Supervisor |
| worker@fincaloscampos.com | Password123! | Worker |

✅ **3 Farms** de prueba

---

## 🌐 Variables de Entorno (Backend)

```env
# API
NODE_ENV=development
PORT=3000
API_PREFIX=api

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/agroapp_dev
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=agroapp_dev
POSTGRES_PORT=5432

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production-must-be-at-least-32-chars
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production-must-be-at-least-32-chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:3001,http://localhost:8081

# Swagger
SWAGGER_ENABLED=true
SWAGGER_PATH=docs
```

---

## 🚀 Deployment Checklist

### Pre-Production

- [ ] Variables de entorno correctas (production)
- [ ] Base de datos en RDS/supabase/similar
- [ ] API HTTPS only
- [ ] CORS configurado para dominio real
- [ ] Email verification implementado
- [ ] Password reset implementado
- [ ] Rate limiting habilitado
- [ ] Logging a servicio externo (Sentry, DataDog)
- [ ] Backups automáticos de BD
- [ ] CDN para assets estáticos

### Security

- [ ] JWT_SECRET es fuerte (32+ caracteres)
- [ ] JWT_REFRESH_SECRET es diferente a JWT_SECRET
- [ ] No loguear sensitive data (passwords, tokens)
- [ ] HTTPS en todas las comunicaciones
- [ ] Headers de seguridad configurados
- [ ] Rate limiting en login (max 3 intentos/5min)
- [ ] Session timeout (30-60 min inactividad)
- [ ] Refresh token rotation (generar nuevo en cada refresh)

### Performance

- [ ] Índices en tablas grandes
- [ ] Query optimization (N+1 queries)
- [ ] Caching (Redis para sessions)
- [ ] Compression (gzip)
- [ ] Connection pooling
- [ ] Database monitoring

### Monitoring

- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (New Relic, DataDog)
- [ ] Uptime monitoring
- [ ] Database monitoring
- [ ] API latency tracking
- [ ] Health check endpoint disponible

---

## ✅ Verificación Final

### Manual Testing

```bash
# 1. Verificar backend esté corriendo
curl http://localhost:3000/api/v1/health

# 2. Login exitoso
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "owner@fincaloscampos.com",
    "password": "Password123!",
    "organizationId": "<org-id-from-seed>"
  }'

# 3. Refresh token
curl -X POST http://localhost:3000/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "<refresh-token>"}'

# 4. Get me (requiere Bearer)
curl http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer <access-token>"

# 5. Logout
curl -X POST http://localhost:3000/api/v1/auth/logout \
  -H "Authorization: Bearer <access-token>"
```

### Automated Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:cov
```

---

## 📞 Soporte

- **Backend Issues**: Ver `agroapp-backend/` en el repo
- **Swagger**: `http://localhost:3000/docs`
- **Database**: PostgreSQL 14+
- **Node**: 22.0.0+
- **Package Manager**: pnpm 11.0.0+

---

**Status**: ✅ **READY FOR MOBILE INTEGRATION**

Backend está completamente configurado y listo para ser consumido por la app móvil. Todos los endpoints de autenticación están implementados, testeados y documentados en Swagger.

**Fecha**: 2026-07-21
**Versión**: 1.0.0
