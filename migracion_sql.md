# Resumen de Migracion de Base de Datos MySQL a Railway

## 1. Exportar la base local
- Abre una terminal en Windows.
- Ejecuta el respaldo:

```bash
mysqldump -u TU_USUARIO -p tecnoalsa_server > tecnoalsa_server.sql
```

- Se genera el archivo `tecnoalsa_server.sql` con estructura y datos.

## 2. Crear MySQL en Railway
- Entra a Railway y crea un proyecto.
- Agrega el servicio MySQL.
- Espera la provision y copia credenciales.

Variables que expone Railway (segun entorno):
- `MYSQLHOST` o `MYSQL_HOST`
- `MYSQLPORT` o `MYSQL_PORT`
- `MYSQLUSER` o `MYSQL_USER`
- `MYSQLPASSWORD` o `MYSQL_PASSWORD`
- `MYSQLDATABASE` o `MYSQL_DATABASE`
- `MYSQL_URL` y/o `MYSQL_PUBLIC_URL`

## 3. Importar el SQL a Railway
- Importa usando host publico y puerto publico:

```bash
mysql -h TU_HOST_PUBLICO -P TU_PUERTO_PUBLICO -u TU_USUARIO -p TU_BD < tecnoalsa_server.sql
```

- Ingresa password cuando la consola lo pida.

## 4. Configurar backend Node.js
El backend usa estas variables en `config/config.js`:
- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `DB_PORT`

Mapeo recomendado en Railway (servicio API):
- `DB_HOST = MYSQLHOST`
- `DB_USER = MYSQLUSER`
- `DB_PASSWORD = MYSQLPASSWORD`
- `DB_NAME = MYSQLDATABASE`
- `DB_PORT = MYSQLPORT`

Nota importante:
- Si conectas desde tu PC (MySQL Workbench), usa host y puerto de `MYSQL_PUBLIC_URL`.
- No uses `*.railway.internal` fuera de Railway.

## 5. Verificacion post migracion
- Comprueba que tablas y datos esten disponibles.
- Ejecuta consultas de validacion.
- Prueba login y creacion de boletas desde la API.

Comandos utiles:

```sql
SHOW FULL TABLES WHERE TABLE_TYPE = 'VIEW';
SHOW PROCEDURE STATUS WHERE Db = 'NOMBRE_BD';
SHOW CREATE PROCEDURE NOMBRE_PROCEDIMIENTO;
```

## 6. Errores frecuentes y solucion
- Error `ECONNREFUSED 127.0.0.1:3306`:
  la API esta intentando conectar a localhost en Railway. Revisar `DB_HOST` y `DB_PORT`.
- Error `ER_ACCESS_DENIED_ERROR`:
  usuario/password o base incorrecta. Revisar `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
- Error desde cliente externo a `*.railway.internal`:
  usar host/puerto publicos.

## 7. Recomendaciones de despliegue
- Confirmar variables en Railway antes de redeploy.
- Mantener respaldo SQL actualizado en `db/`.
- Probar endpoints criticos despues del despliegue.

---

Documento actualizado para el flujo actual de migracion y despliegue en Railway.