const db = require('../config/config');

const Stock = {};

Stock.getAllByUser = (usuario, result) => {
    const sql = `
    SELECT
        CONVERT(I.id_inventario, char) AS id_inventario,
        CONVERT(I.id_cliente, char) AS id_cliente,
        CONVERT(I.fecha, char) AS fecha,
        CONVERT(I.local, char) AS local,
        CONVERT(I.id_usuarioE, char) AS id_usuarioE,
        I.codigo_producto,
        CONVERT(I.cantidad, char) AS cantidad,
        CONVERT(I.valor, char) AS valor,
        CONVERT(I.id_proveedor, char) AS id_proveedor,
        I.observacion,
        CONVERT(I.tipo_movimiento, char) AS tipo_movimiento,
    I.numero_documento
    FROM
        inventario as I  
    WHERE 
        I.id_cliente = ? OR I.id_usuarioE = ?
    `;

    db.query(
        sql,
        [
            usuario,
            usuario
        ],
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Stock:', data);
                result(null, data);
            }
        }
    )
}

Stock.getByCodigo = (producto,usuario, result) => {
    const sql = `
    SELECT
        CONVERT(I.id_inventario, char) AS id_inventario,
        CONVERT(I.id_cliente, char) AS id_cliente,
        CONVERT(I.fecha, char) AS fecha,
        I.local,
        CONVERT(I.id_usuarioE, char) AS id_usuarioE,
        I.codigo_producto,
        I.cantidad,
        I.valor,
        I.id_proveedor,
        I.observacion,
        CONVERT(I.tipo_movimiento, char) AS tipo_movimiento,
    I.numero_documento
    FROM
        inventario as I  
    WHERE 
        I.codigo_producto = ? && I.id_cliente = ? OR I.id_usuarioE = ?
    `;

    db.query(
        sql,
        [
            producto,
            usuario,
            usuario
        ],
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Stock:', data);
                result(null, data);
            }
        }
    )
}

Stock.consultaInventario = (usuario, result) => {
    const sql = `
    SELECT
        C.id_producto AS id,
        C.cantidad,
        C.nombre AS nombre_producto,
        C.codigo_producto AS codigo_barra,
        CONVERT(C.cliente, char) AS usuario
    FROM

    
    inventario as C  
        WHERE 
        C.cliente = ? 
    `;

    db.query(
        sql,
        [
            usuario
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

Stock.getAllByDate = (usuario,inicial, fin, result) => {
    const sql = `
    SELECT
        C.id_producto AS id,
        C.cantidad,
        C.nombre AS nombre_producto,
        C.codigo_producto AS codigo_barra,
        CONVERT(C.cliente, char) AS usuario
    FROM
        ConsultaInventarioGeneral as C  
        WHERE 
        C.cliente = ? && C.fecha BETWEEN  ? AND ?
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

Stock.create = (inventario, producto, result) => {

    const sql = `
    INSERT INTO
        inventario(
            id_cliente,
            local,
            id_usuarioE,
            codigo_producto,
            cantidad,
            valor,
            id_proveedor,
            fecha,
            tipo_movimiento,
            observacion,
            numero_documento
        )
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Validar numero_documento
    let numero_documento = inventario.numero_documento;
    if (!numero_documento || numero_documento === '' || numero_documento === null) {
        numero_documento = '0000';
    }
    let valor = producto.precio_venta;
if (valor === undefined || valor === null || valor === '') {
    valor = 0;
}
    db.query(
        
        sql, 
        [
            inventario.id_cliente,
            inventario.local,
            inventario.id_usuarioE,
            producto.codigo_producto,
            producto.cantidad,
            valor,
            inventario.id_provedor,
            inventario.fecha,
            2,
            2,
            numero_documento
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Stock:', res.insertId);
                result(null, res.insertId);
            }
        }

    )

}

Stock.discount = (inventario, producto, result) => {

    const sql = `
    INSERT INTO
        inventario(
            id_cliente,
            local,
            id_usuarioE,
            codigo_producto,
            cantidad,
            valor,
            id_proveedor,
            fecha,
            tipo_movimiento,
            observacion,
            numero_documento
        )
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Validar numero_documento
    let numero_documento = inventario.numero_documento;
    if (!numero_documento || numero_documento === '' || numero_documento === null) {
        numero_documento = '0000';
    }
    db.query(
        sql, 
        [
            inventario.id_cliente,
            inventario.local,
            inventario.id_usuarioE,
            producto.id,
            - producto.cantidad,
            - producto.precio_venta,
            0,
            inventario.fecha,
            2,
            2,
            numero_documento
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Stock:', res.insertId);
                result(null, res.insertId);
            }
        }

    )

}

module.exports = Stock;