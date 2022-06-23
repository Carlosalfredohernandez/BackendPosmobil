const mysql = require('mysql');

const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '-Czca5uyy',
    database: 'tecnoalsa_server'
});

db.connect(function(err){

    if (err) throw err;
    console.log('BASE DE DATOS CONECTADA!');

});

module.exports = db;
