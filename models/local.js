const db = require('../config/config');

const Local = {};

Local.create = (local, result) => {

    const sql = `
    INSERT INTO
        locales(
            usuario,
            nombre_local,
            pos_numero,
            adddate_at,
            updated_at   
        )
    VALUES(?, ?, ?, ?, ?)
    `;

    db.query(
        sql, 
        [
            local.usuario,
            local.nombre_local,
            local.pos_numero,
            new Date(),
            new Date(),
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del nuevo local:', res.insertId);
                result(null, res.insertId);
            }
        }

    )

}

Local.findLocals = (usuario,result) => {

    const sql =`
    SELECT
        CONVERT(L.id, char) AS id,
        L.usuario,
        L.nombre_local,
        L.pos_numero
    FROM
	    locales AS L
    WHERE
        L.usuario = ?
    GROUP BY
	    L.id
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

Local.update = (local, result) => {
    const sql = `
    UPDATE locales
    SET
        nombre_local = ?,
        pos_numero = ?,
        updated_at = ?
    WHERE
        id = ?
    `;
    db.query(
        sql,
        [
            local.nombre_local,
            local.pos_numero,
            new Date(),
            local.id
        ],
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

module.exports = Local;