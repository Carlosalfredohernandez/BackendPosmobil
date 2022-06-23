const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');



//RUTAS
const users = require('./routes/userRoutes');
const userRoutes = require('./routes/userRoutes');


const port = process.env.PORT || 4400;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port', port);

//LLAMADO DE RUTAS

userRoutes(app);

server.listen(4400,'localhost', function(){
    console.log('Servidor de Tecnoalsa ' + port + ' Iniciada...')
});

app.get('/', (req, res) =>{
    res.send('Servidor Funcionando gracias a tu internet.');
});

app.get('/Tecnoalsa', (req, res) =>{
    res.send('Hola Estamos construyendo este servidor, para mejorar nuestros servicios.');
});


//ERRORES

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});