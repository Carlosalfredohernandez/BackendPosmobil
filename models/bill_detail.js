const db = require('../config/config');

const BillDetail = {};

BillDetail.create = (number, quantity, idProducto, value, total, result) => {

    const sql = `
    INSERT INTO
	    boletasdetalle(
		    numeroB,
            cantidad,
            id_producto,
            valor,
            total
	    )
    VALUES(?, ?, ?, ?, ?)
    `;

    db.query(
        sql, 
        [
            number,
            quantity,
            idProducto,
            value,
            total
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id:', res.insertId);
                result(null, res.insertId);
            }
        }

    )

}

module.exports = BillDetail;
