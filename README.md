# BackendLocal3009

Backend API en Node.js + Express + MySQL para el sistema de punto de venta Tecnoalsa.

## Tecnologias
- Node.js
- Express
- MySQL (mysql2)
- JWT
- bcryptjs

## Estructura principal
- `server.js`: arranque del servidor y registro de rutas.
- `config/config.js`: conexion a MySQL por variables de entorno.
- `controllers/`: logica de negocio por modulo.
- `models/`: acceso a datos SQL.
- `routes/`: definicion de endpoints.
- `db/`: scripts SQL y respaldo.

## Requisitos
- Node.js 18+
- MySQL local o MySQL en Railway

## Instalacion local
```bash
npm install
node server.js
```

Servidor por defecto:
- Host: `0.0.0.0`
- Puerto: `4400`

## Variables de entorno
El proyecto usa estas variables en `config/config.js`:

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `DB_PORT`

Ejemplo local:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=tecnoalsa_server
DB_PORT=3306
```

## Despliegue en Railway
1. Conectar el repositorio GitHub en Railway.
2. Crear o enlazar servicio MySQL.
3. Configurar variables de entorno de la API:
   - `DB_HOST = MYSQLHOST`
   - `DB_USER = MYSQLUSER`
   - `DB_PASSWORD = MYSQLPASSWORD`
   - `DB_NAME = MYSQLDATABASE`
   - `DB_PORT = MYSQLPORT`
4. Deploy automatico desde rama principal.

Nota:
- Para clientes externos (Workbench), usar host y puerto de `MYSQL_PUBLIC_URL`.
- No usar `*.railway.internal` desde tu PC.

## Endpoints base
- `GET /`
- `GET /test`
- `POST /api/usuarios/login`
- `POST /api/usuariosempresa/login`
- `GET /api/usuariosempresa/findUsers/:usuario`
- `POST /api/boletas/create`

## Cambios recientes
- Correccion de parseo de roles en login/usuarios para evitar `Unexpected token o in JSON at position 1`.
- Ajustes de documentacion para migracion y conexion a Railway.

## Observaciones operativas
- El endpoint de boletas requiere `inventario` en el body cuando descuenta stock.
- Si `boleta.inventario` llega `null`, el flujo puede fallar en `Stock.discount`.

## Troubleshooting rapido
- `ECONNREFUSED 127.0.0.1:3306`: variables DB en Railway incorrectas (apunta a localhost).
- `ER_ACCESS_DENIED_ERROR`: usuario/password/base invalidos.
- Reinicio por excepcion en runtime: revisar logs de Railway y validar body de solicitudes criticas.

## Licencia
MIT
