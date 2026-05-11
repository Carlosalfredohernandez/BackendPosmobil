const db = require('../config/config');

const Bill = {};

Bill.create = (bill, result) => {

    const sql = `
    INSERT INTO
	    boletas(
		    numero,
            usuario,
            local_usuario,
            fecha,
            valor,
            forma_pago
	    )
    VALUES(?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql, 
        [
            bill.numero,
            bill.usuario,
            bill.local_usuario,
            new Date(),
            bill.valor,
            bill.forma_pago
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nueva boleta:', res.insertId);
                result(null, res.insertId);
            }
        }

    )

}
Bill.getAllByUser = (usuario, result) => {
    const sql = `
    SELECT  
        CONVERT(B.id, char) AS id,
        B.numero,
        B.usuario,
        B.local_usuario,
        B.fecha,
        B.valor,
        B.forma_pago,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', CONVERT(V.id, char),
                'numero', V.numero,
                'fecha', V.fecha,
                'valor', V.valor,
                'id_producto', V.id_producto,
                'Cantidad', V.Cantidad,
                'ValorLinea', V.ValorLinea,
                'TotalLinea', V.TotalLinea,
                'nombre_producto', V.nombre_producto
            )
        ) AS detalle
    FROM
        boletas as B
    INNER JOIN
        ventas_detalle AS V
    ON
        B.id = V.id
    WHERE 
        B.usuario = ?
	GROUP BY
	    B.id
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
Bill.getTrimedDateArray = (usuario,inicial,fin, result) => {
    const sql = `
    SELECT  
        CONVERT(B.id, char) AS id,
        B.numero,
        B.usuario,
        B.local_usuario,
        B.fecha,
        B.valor,
        B.forma_pago,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', CONVERT(V.id, char),
                'numero', V.numero,
                'fecha', V.fecha,
                'valor', V.valor,
                'id_producto', V.id_producto,
                'Cantidad', V.Cantidad,
                'ValorLinea', V.ValorLinea,
                'TotalLinea', V.TotalLinea,
                'nombre_producto', V.nombre_producto
            )
        ) AS detalle
    FROM
        boletas as B
    INNER JOIN
        ventas_detalle AS V
    ON
        B.id = V.id
    WHERE 
        B.usuario = ? && B.fecha BETWEEN  ? AND ?
    GROUP BY
	    B.id
    `;

    db.query(
        sql,
        [
            usuario,
            inicial,
            fin
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

/*
Bill.getSells = (boleta, result) => {
    const sql = `
    SELECT
        CONVERT(V.id, char) AS id,
	    V.numero,
	    V.fecha,
	    V.valor,
	    V.id_producto,
        V.Cantidad,
        V.ValorLinea,
        V.TotalLinea,
        V.nombre_producto
    FROM
	    ventas_detalle AS V
    WHERE
	    id = ?
    `;

    db.query(
        sql,
        [boleta],
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
*/
module.exports = Bill;