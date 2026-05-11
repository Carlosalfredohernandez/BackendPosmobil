const Parser = require("mysql/lib/protocol/Parser");
const Stock = require("../models/stock");

module.exports = {
    async create(req, res) {
    const inventario = req.body;

    // Llama a Stock.create pasando inventario como ambos parámetros
    await Stock.create(inventario, inventario, (err, id) => {
        if (err) {
            return res.status(501).json({
                success: false,
                message: 'Hubo un error',
                error: err
            });
        }
        return res.status(201).json({
            success: true,
            message: 'El inventario ha sido actualizado',
        });
    });

// antiguo antes de modificar

    /*async create(req, res) {

        const inventario = req.body;
        
        for (const producto of inventario.productos) {
                
            await Stock.create(inventario, producto, (err, id) => {
                
                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error',
                        error: err
                    });
                }
            });
        }
        return res.status(201).json({
            success: true,
            message: 'El inventario ha sido actualizado',
        });
*/
    },
    
    getAllByUser(req, res) {
        const usuario = req.params.usuario;

        Stock.getAllByUser(usuario, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar los locales',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },

    getByCodigo(req, res) {
        const usuario = req.params.usuario;
        const producto = req.params.producto;

        Stock.getByCodigo(producto,usuario, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar los locales',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },

    consultaInventario(req, res) {
        
        const usuario = req.params.usuario;

        Stock.consultaInventario(usuario,(err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar los locales',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },


    getAllByDate(req, res) {
        
        const usuario = req.params.usuario;
        const inicial = req.params.inicial;
        const fin = req.params.fin;

        Stock.getAllByDate(usuario,inicial,fin, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar los locales',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },
  
}