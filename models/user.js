const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};

User.findById = (id, result) => {

    const sql =`
    SELECT
        id,
        nombre,
        rut,
        email,
        clave
    FROM
        usuarios
    WHERE
        rut = ?
    `;

    db.query(
        sql,
        [id],
        (err, user) => {
            if(err){
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido: ', user[0]);
                result(null, user[0]);

            }
        }

    )
}

User.findByRut = (rut, result) => {

    const sql =`
    SELECT
        id,
        nombre,
        rut,
        email,
        clave
    FROM
        usuarios
    WHERE
        rut = ?
    `;

    db.query(
        sql,
        [rut],
        (err, user) => {
            if(err){
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido: ', user[0]);
                result(null, user[0]);

            }
        }

    )
}

User.create = async (user, result) => {

    const hash = await bcrypt.hash(user.clave, 10);

    const sql = `
        INSERT INTO
            usuarios(
                nombre,
                rut,
                region,
                comuna,
                calle,
                numero,
                local_oficina,
                telefono,
                clave,
                tipo_contrato,
                contrato,
                email,
                adddate_at,
                update_at

            )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)    
    `;

    db.query
    (
        sql,
        [
            user.nombre,
            user.rut,
            user.region,
            user.comuna,
            user.calle,
            user.numero,
            user.local_oficina,
            user.telefono,
            hash,
            user.tipo_contrato,
            new Date(),
            user.email,
            new Date(),
            new Date()
        ],

        (err, res) => {
            if(err){
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del nuevo usuario: ', res.insertId);
                result(null, res.insertId);

            }
        }


    )

}

module.exports = User;
