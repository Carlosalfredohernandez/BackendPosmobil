const db = require('../config/config');
const bcrypt = require('bcryptjs');
const UserE = {};

UserE.create = async (user, result) => {

    console.log('Datos recibidos para crear usuario:', user); // 👈 Log para debug

    const hash = await bcrypt.hash(user.password, 10);

    const sql = `
        INSERT INTO
            usuariosempresa(
	            empresa,
	            local_asignado,
	            nombre_usuario,
	            rol,
                rut,
                password,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)    
    `;

    db.query
    (
        sql,
        [
            user.empresa,
            user.localAsignado,
            user.nombreUsuario,
            3,
            user.rut,
            hash,
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

UserE.findByRut = (rut, result) => {

    const sql =`
    SELECT
        CONVERT(id, char) AS id,
	    empresa,
	    rut,
	    local_asignado,
	    nombre_usuario,
        rol,
        password
    FROM
	    usuariosempresa
    WHERE
	    rut = ?
    GROUP BY
	    id
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

UserE.update = async (user, result) => {

    const sql = `
    UPDATE
        usuariosempresa
    SET
        local_asignado = ?,
        rol = ?,
        updated_at = ?
    WHERE
        rut = ?
    `;

    db.query
    (
        sql,
        [
            user.local_asignado,
            user.rol,
            new Date(),
            user.rut
        ],
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, data);
            }
        }
    )
}

UserE.findUsers = (usuario,result) => {

    const sql =`
    SELECT
	    CONVERT(U.id, char) AS id,
	    U.empresa,
        CONVERT(U.local_asignado, char) AS local_asignado,
	    U.nombre_usuario,
	    U.rol,
        U.rut,
        U.password
    FROM
        usuariosempresa AS U
    WHERE
        U.empresa = ?
    GROUP BY
	    U.id
    `;
    db.query(
        sql,
        [usuario],
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, data);
            }
        }

    )
}
UserE.delete = (id, result) => {
    const sql = `
        DELETE FROM usuariosempresa
        WHERE id = ?
    `;
    db.query(
        sql,
        [id],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                result(null, res);
            }
        }
    );
};
module.exports = UserE;
