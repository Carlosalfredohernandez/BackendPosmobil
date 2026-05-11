const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};

User.findById = (id, result) => {

    const sql =`
    SELECT
	    U.id,
	    U.nombre,
	    U.rut,
	    U.email,
	    U.clave,
        U.tipo_contrato,
        JSON_ARRAYAGG(
		    JSON_OBJECT(
			    'id', CONVERT(R.id, char), 
                'nombre', R.nombre,
                'ruta', R.ruta
            )
        ) AS roles
    FROM
	    usuarios AS U
    INNER JOIN
	    usuario_has_roles AS UHR
    ON
	    UHR.id_usuario = U.id
    INNER JOIN
	    roles AS R
    ON
	    UHR.id_rol = R.id
    WHERE
	    id = ?
    GROUP BY
	    U.id
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

User.findUsers = (id ,result) => {

    const sql =`
    SELECT
        CONVERT(U.id, char) AS id,
	    U.nombre,
	    U.rut,
	    U.email,
	    U.clave,
        U.telefono,
        U.comuna,
        U.calle,
        U.numero,
        U.region,
        U.tipo_contrato,
        JSON_ARRAYAGG(
		    JSON_OBJECT(
			    'id', CONVERT(R.id, char), 
                'nombre', R.nombre,
                'ruta', R.ruta
            )
        ) AS roles
    FROM
	    usuarios AS U
    INNER JOIN
	    usuario_has_roles AS UHR
    ON
	    UHR.id_usuario = U.id
    INNER JOIN
	    roles AS R
    ON
	    UHR.id_rol = R.id
	INNER JOIN
	    usuariosempresa AS E
    ON
	    U.rut = E.rut
    WHERE
        E.empresa = ?
    GROUP BY
	    U.id
    `;
    db.query(
        sql,
        [id],
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

User.update = async (user, result) => {
    const hash = await bcrypt.hash(user.clave, 10);

    const sql = `
    UPDATE
        usuarios
    SET
        telefono = ?,
        clave = ?,
        region = ?,
        numero = ?,
        comuna = ?,
        calle = ?,
        update_at = ?
    WHERE
        id = ?
    `;

    db.query
    (
        sql,
        [
            user.telefono,
            hash,
            user.region,
            user.numero,
            user.comuna,
            user.calle,
            new Date(),
            user.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario actualizado:', user.id);
                result(null, user.rut);
            }
        }
    )
}

User.updateRol = (user_id,idRol, result) => {

    const sql = `
    UPDATE
        usuario_has_roles
    SET
        id_rol = ?,
        updated_at = ?
    WHERE
        id_usuario = ?
    `;

    db.query
    (
        sql,
        [
            idRol,
            new Date(),
            user_id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario actualizado:', user_id);
                result(null, user_id);
            }
        }
    )
}

User.findByRut = (rut, result) => {

    const sql =`
    SELECT
        CONVERT(U.id, char) AS id,
	    U.nombre,
	    U.rut,
	    U.email,
	    U.clave,
        U.telefono,
        U.comuna,
        U.calle,
        U.numero,
        U.region,
        U.tipo_contrato,
        JSON_ARRAYAGG(
		    JSON_OBJECT(
			    'id', CONVERT(R.id, char),
                'nombre', R.nombre,
                'ruta', R.ruta
            )
        ) AS roles
    FROM
	    usuarios AS U
    INNER JOIN
	    usuario_has_roles AS UHR
    ON
	    UHR.id_usuario = U.id
    INNER JOIN
	    roles AS R
    ON
	    UHR.id_rol = R.id
    WHERE
	    rut = ?
    GROUP BY
	    U.id
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
// En tu modelo User.js
User.findByRutOrEmail = (rut, email, result) => {
    const sql = 'SELECT * FROM usuarios WHERE rut = ? OR email = ? LIMIT 1';
    db.query(sql, [rut, email], (err, rows) => {
        if (err) return result(err, null);
        if (rows.length > 0) return result(null, rows[0]);
        return result(null, null);
    });
};

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
User.getAll = (result) => {
    const sql = `
        SELECT
            CONVERT(U.id, char) AS id,
            U.nombre,
            U.rut,
            U.email,
            U.clave,
            U.telefono,
            U.comuna,
            U.calle,
            U.numero,
            U.region,
            U.tipo_contrato,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', CONVERT(R.id, char), 
                    'nombre', R.nombre,
                    'ruta', R.ruta
                )
            ) AS roles
        FROM
            usuarios AS U
        INNER JOIN
            usuario_has_roles AS UHR ON UHR.id_usuario = U.id
        INNER JOIN
            roles AS R ON UHR.id_rol = R.id
        GROUP BY
            U.id
    `;
    db.query(sql, (err, data) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
        } else {
            result(null, data);
        }
    });
};
module.exports = User;
