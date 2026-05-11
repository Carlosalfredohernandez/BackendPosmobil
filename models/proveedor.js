const db = require('../config/config');

const Proveedor = {};

Proveedor.create = (proveedor, result) => {

    const sql = `
    INSERT INTO
        proveedor(
            nombre,
            telefono,
            email,
            direccion,
            Contrato,
            id_usuario
        )
    VALUES(?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql, 
        [
            proveedor.nombre,
            proveedor.telefono,
            proveedor.email,
            proveedor.direccion,
            proveedor.contrato,
            proveedor.id_usuario,
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, res.insertId);
            }
        }

    )

}
// ...existing code...

Proveedor.update = (proveedor, result) => {
    const sql = `
    UPDATE
        proveedor
    SET
        nombre = ?,
        telefono = ?,
        email = ?,
        direccion = ?,
        Contrato = ?
    WHERE
        id = ?
    `;

    db.query(
        sql,
        [
            proveedor.nombre,
            proveedor.telefono,
            proveedor.email,
            proveedor.direccion,
            proveedor.contrato,
            proveedor.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                result(null, proveedor.id);
            }
        }
    );
}

// ...existing code...
Proveedor.getProveedor = (usuario,result) => {

    const sql =`
    SELECT
        CONVERT(P.id, char) AS id,
        P.nombre,
        P.telefono,
        P.email,
        P.direccion,
        P.Contrato,
        P.id_usuario
    FROM
        proveedor AS P
    WHERE
        P.id_usuario = ?
    GROUP BY
        P.id
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

module.exports = Proveedor;