




const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'tecnoalsa_server'
});

db.connect(function(err){
    if (err) throw err;
    console.log('BASE DE DATOS CONECTADA!');
});

module.exports = db;
