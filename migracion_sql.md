# Resumen de Migración de Base de Datos MySQL a Railway

## 1. Exportar la base de datos local
- Abre una terminal.
- Ejecuta:
  mysqldump -u TU_USUARIO -p tecnoalsa_server > tecnoalsa_server.sql
- Se generará el archivo `tecnoalsa_server.sql` con la estructura y datos.

## 2. Crear base de datos en Railway
- Ingresa a https://railway.app y crea un nuevo proyecto.
- Selecciona “MySQL” como tipo de base de datos.
- Espera a que se cree la instancia y copia los datos de conexión (host, usuario, contraseña, puerto, nombre de la base de datos).

## 3. Importar el archivo SQL a Railway
- En la terminal, ejecuta:
  mysql -h TU_HOST_RAILWAY -u TU_USUARIO -p -P TU_PUERTO TU_NOMBRE_BD < tecnoalsa_server.sql
- Ingresa la contraseña cuando se solicite.

## 4. Verificar la importación
- Conéctate a la base de datos Railway usando un cliente MySQL o la consola web de Railway.
- Revisa que las tablas y datos estén presentes.

## 5. (Opcional) Agregar mysqldump al PATH en Windows
- Ubica la carpeta `bin` de MySQL (ejemplo: C:\Program Files\MySQL\MySQL Server X.X\bin).
- Copia la ruta.
- Ve a Panel de control → Sistema → Configuración avanzada del sistema → Variables de entorno.
- Edita la variable `Path` y agrega la ruta copiada.
- Cierra y abre la terminal nuevamente.
- Verifica con: mysqldump --version

---

Este archivo resume los pasos para migrar tu base de datos MySQL local a Railway.