@echo off
echo 🚀 Iniciando BackendLocal3009 para emulador Android...
echo.
echo 📍 Navegando al directorio del servidor...
cd /d "C:\Proyectos Flutter\BackendLocal3009"
echo.
echo 🔧 Configurando variables de entorno...
set HOST=0.0.0.0
set PORT=4400
echo   HOST=%HOST%
echo   PORT=%PORT%
echo.
echo 🌐 Iniciando servidor Node.js...
echo   Servidor escuchará en todas las interfaces (0.0.0.0:4400)
echo   Esto permite conexiones desde el emulador Android (10.0.2.2:4400)
echo.
node server.js
echo.
echo ❌ El servidor se ha detenido.
pause