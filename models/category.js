const db = require('../config/config');

const Category = {};

Category.getAll = (result) => {
    const sql = `
    SELECT
        CONVERT(id, char) AS id,
        nombre_categoria
        
    FROM
        categorias
    ORDER BY
        nombre_categoria
    `;

    db.query(
        sql,
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Categorias:', data);
                result(null, data);
            }
        }
    )
}

Category.getAllByUser = (usuario, result) => {
    const sql = `
    SELECT
        CONVERT(C.id, char) AS id,
        C.usuario,
        C.nombre_categoria
    FROM
        categorias as C  
    WHERE 
        C.usuario = ?
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
                console.log('Categorias:', data);
                result(null, data);
            }
        }
    )
}

Category.getNameById = (categoria, result) => {
    const sql = `
    SELECT
        C.nombre_categoria
    FROM
        categorias as C  
    WHERE 
        C.id = ? && P.categoria IS NOT NULL
    `;

    db.query(
        sql,
        [categoria],
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Categorias:', data);
                result(null, data);
            }
        }
    )
}

Category.create = (category, result) => {

    const sql = `
    INSERT INTO
        categorias(
            usuario,
            nombre_categoria,
            adddate_at,
            updated_at   
        )
    VALUES(?, ?, ?, ?)
    `;

    db.query(
        sql, 
        [
            category.usuario,
            category.nombre_categoria,
            new Date(),
            new Date(),
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nueva categoria:', res.insertId);
                result(null, res.insertId);
            }
        }

    )

}


module.exports = Category;