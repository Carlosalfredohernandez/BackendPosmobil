const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');

// ✅ IMPORTAR CONFIGURACIÓN DE BASE DE DATOS
const db = require('./config/config');

// ✅ IMPORTAR TODAS LAS RUTAS
const userRoutes = require('./routes/userRoutes');
const userEntRoutes = require('./routes/userEntRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const billRoutes = require('./routes/billRoutes');
const localRoutes = require('./routes/localRoutes');
const proveedorRoutes = require('./routes/proveedorRoutes');
const stockRoutes = require('./routes/stockRoutes');
const estadisticasRoutes = require('./routes/estadisticasRoutes');

// ✅ CONFIGURACIÓN DUAL - LOCALHOST Y IP ESPECÍFICA
const port = 4400;
const host = '0.0.0.0'; // Escuchar en todas las interfaces

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

app.disable('x-powered-by');
app.set('port', port);

// ✅ REGISTRAR TODAS LAS RUTAS
userRoutes(app, db);
userEntRoutes(app, db);
categoryRoutes(app, db);
productRoutes(app, db);
billRoutes(app, db);
localRoutes(app, db);
proveedorRoutes(app, db);
stockRoutes(app, db);
estadisticasRoutes(app, db);

// RUTAS BÁSICAS DE PRUEBA
app.get('/', (req, res) => {
    res.send('Ruta raiz del backend Funcionando con base de datos MySQL tecnoalsa_server.');
});

app.get('/test', (req, res) => {
    res.send('Servidor Funcionando en test con base de datos');
});

app.get('/Tecnoalsa', (req, res) => {
    res.send('Hola Estamos construyendo este servidor, para mejorar nuestros servicios.');
});

// RUTA DE LOGIN SIMULADA PARA PRUEBAS
app.post('/api/usuarios/login', (req, res) => {
    console.log('🔐 Login attempt:', req.body);
    
    // Simular respuesta exitosa
    res.json({
        success: true,
        message: 'Login simulado exitoso',
        data: {
            id: 1,
            nombre: 'Usuario Test',
            empresa_id: '77710916-2',
            rol: 1
        }
    });
});

//ERRORES
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

// INICIAR SERVIDOR
server.listen(port, host, function(){
    console.log('🚀 Servidor de Tecnoalsa ' + port + ' Iniciada...');
    console.log('🌐 Escuchando en ' + host + ':' + port);
    console.log('✅ Accesible desde localhost:4400 y 192.168.1.88:4400');
    console.log('🗄️ Conectado a base de datos MySQL: tecnoalsa_server');
    console.log('');
    console.log('📋 Rutas API disponibles:');
    console.log('  GET  http://localhost:' + port + '/');
    console.log('  GET  http://localhost:' + port + '/test');
    console.log('  POST http://localhost:' + port + '/api/usuarios/login');
    console.log('  POST http://localhost:' + port + '/api/usuariosempresa/login');
    console.log('  GET  http://localhost:' + port + '/api/usuariosempresa/findUsers/:usuario');
    console.log('  POST http://192.168.1.88:' + port + '/api/usuarios/login');
    console.log('  POST http://192.168.1.88:' + port + '/api/usuariosempresa/login');
    console.log('  GET  http://192.168.1.88:' + port + '/api/usuariosempresa/findUsers/:usuario');
});