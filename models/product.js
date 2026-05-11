const db = require('../config/config');

const Product = {};

// Utilidad para mapear imagenUrl (frontend) a imagen_url (backend) y viceversa
function mapToDb(product) {
    return {
        ...product,
        imagen_url: product.imagenUrl ?? product.imagen_url
    };
}

function mapFromDb(row) {
    return {
        ...row,
        imagenUrl: row.imagen_url,
    };
}

Product.findByCategory = (categoria, result) => {
    const sql = `
    SELECT
        CONVERT(P.id, char) AS id,
        P.usuario,
        P.categoria,
        P.nombre_producto,
        P.descripcion_producto,
        P.codigo_barra,
        P.precio_costo,
        P.precio_venta,
        P.proveedor,
        P.imagen_url,
        CONVERT(P.categoria, char) AS categoria
    FROM
        productos as P
    WHERE 
        P.categoria = ?
    `;

    db.query(
        sql,
        [categoria],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, res.map(mapFromDb));
            }
        }
    );
}

Product.getAllByUser = (usuario, result) => {
    const sql = `
    SELECT
        CONVERT(P.id, char) AS id,
        P.usuario,
        P.categoria,
        P.nombre_producto,
        P.descripcion_producto,
        P.codigo_barra,
        P.precio_costo,
        P.precio_venta,
        P.proveedor,
        P.imagen_url
    FROM
        productos as P  
    WHERE 
        P.usuario = ? && P.categoria IS NOT NULL
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
                result(null, data.map(mapFromDb));
            }
        }
    )
}
Product.getProduct = (codigoBarra, result) => {
    const sql = `
    SELECT
        CONVERT(P.id, char) AS id,
        P.usuario,
        P.categoria,
        P.nombre_producto,
        P.descripcion_producto,
        P.codigo_barra,
        P.precio_costo,
        P.precio_venta,
        P.proveedor,
        P.imagen_url
    FROM
        productos as P  
    WHERE 
        P.codigo_barra = ?
    `;

    db.query(
        sql,
        [codigoBarra],
        (err, producto) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, producto[0] ? mapFromDb(producto[0]) : null);
            }
        }
    )
}

Product.create = (product, result) => {
    const mappedProduct = mapToDb(product);

    const sql = `
    INSERT INTO
        productos(
            usuario,
            categoria,
            nombre_producto,
            descripcion_producto,
            codigo_barra,
            precio_costo,
            precio_venta,
            proveedor,
            imagen_url,
            adddate_at,
            updated_at  
        )
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql, 
        [
            mappedProduct.usuario,
            mappedProduct.categoria,
            mappedProduct.nombre_producto,
            mappedProduct.descripcion_producto,
            mappedProduct.codigo_barra,
            mappedProduct.precio_costo,
            mappedProduct.precio_venta,
            mappedProduct.proveedor,
            mappedProduct.imagen_url,
            new Date(),
            new Date(),
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
Product.findProductsOnText = (text,id_usuario, result) => {
    const sql =`
    SELECT  
        CONVERT(P.id, char) AS id,
        P.usuario,
        P.categoria,
        P.nombre_producto,
        P.descripcion_producto,
        P.codigo_barra,
        P.precio_costo,
        P.precio_venta,
        P.proveedor,
        P.imagen_url
    FROM
        productos as P
    WHERE 
        P.usuario = ? AND P.codigo_barra LIKE ? 
        or P.usuario = ? AND LOWER(P.nombre_producto) LIKE ?
    `;

    db.query(
        sql,
        [
            id_usuario,
            `%${text.toLowerCase()}%`,
            id_usuario,
            `%${text.toLowerCase()}%`
        ],
        (err, res) =>{
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, res.map(mapFromDb));
            }
        }
    );
}
Product.findProductsOnTextWithCategory = (category,text,id_usuario, result) => {
    const sql =`
    SELECT  
        CONVERT(P.id, char) AS id,
        P.usuario,
        P.categoria,
        P.nombre_producto,
        P.descripcion_producto,
        P.codigo_barra,
        P.precio_costo,
        P.precio_venta,
        P.proveedor,
        P.imagen_url
    FROM
        productos as P
    WHERE 
        P.categoria = ? AND P.usuario = ? AND P.codigo_barra LIKE ? or P.categoria = ? AND P.usuario = ? AND LOWER(P.nombre_producto) LIKE ?
    `;

    db.query(
        sql,
        [
            category,
            id_usuario,
            `%${text.toLowerCase()}%`,
            category,
            id_usuario,
            `%${text.toLowerCase()}%`
        ],
        (err, res) =>{
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, res.map(mapFromDb));
            }
        }
    );
}

Product.update = (product, result) => {
    const mappedProduct = mapToDb(product);

    const sql = `
    UPDATE
        productos
    SET
        nombre_producto = ?,
        descripcion_producto = ?,
        codigo_barra = ?,
        precio_venta = ?,
        imagen_url = ?,
        updated_at = ? 
    WHERE
        id = ?
    `;

    db.query(
        sql, 
        [
            mappedProduct.nombre_producto,
            mappedProduct.descripcion_producto,
            mappedProduct.codigo_barra,
            mappedProduct.precio_venta,
            mappedProduct.imagen_url,
            new Date(),
            mappedProduct.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, mappedProduct.id);
            }
        }
    )
}

Product.findById = (id, result) => {
    const sql =`
    SELECT
        usuario,
        categoria,
        nombre_producto,
        descripcion_producto,
        codigo_barra,
        precio_costo,
        precio_venta,
        proveedor,
        imagen_url,
        adddate_at,
        updated_at 
    FROM
        productos
    WHERE
        id = ?
    `;

    db.query(
        sql,
        [id],
        (err, product) => {
            if(err){
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, product[0] ? mapFromDb(product[0]) : null);
            }
        }
    )
}
Product.deshabilitar = (product, result) => {
    const sql = `
    UPDATE
        productos
    SET
        categoria = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql, 
        [
            null,
            new Date(),
            product
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, product);
            }
        }
    )
}

module.exports = Product;