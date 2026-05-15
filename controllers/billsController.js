const Parser = require("mysql/lib/protocol/Parser");
const Bill = require("../models/bill");
const BillDetail = require("../models/bill_detail");
const Stock = require("../models/stock");

module.exports = {
    async create(req, res) {

        const boleta = req.body;

        Bill.create(boleta, async (err, id) => {
            if (err) {
                console.log('Error en Bill.create:', err);
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de crear la orden',
                    error: err
                });
            }

            let errorEnDetalle = null;
            let errorEnStock = null;

            // Usar promesas para procesar los productos
            const procesarProducto = (producto) => {
                return new Promise((resolve, reject) => {
                    var totalLinea = parseInt(producto.precio_venta) * producto.cantidad;
                    BillDetail.create(id, producto.cantidad, producto.id, producto.precio_venta, totalLinea, (err, id_data) => {
                        if (err) {
                            console.log('Error en BillDetail.create:', err);
                            errorEnDetalle = err;
                            return reject(err);
                        }
                        Stock.discount(boleta.inventario, producto, (err, id_inventario) => {
                            if (err) {
                                console.log('Error en Stock.discount:', err);
                                errorEnStock = err;
                                return reject(err);
                            }
                            resolve();
                        });
                    });
                });
            };

            try {
                for (const producto of boleta.productos) {
                    await procesarProducto(producto);
                }
            } catch (err) {
                console.log('Error al procesar los productos:', err);
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al procesar los productos',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La boleta se ha creado exitosamente',
                data: `${id}`
            });
        });

    },
    getAllByUser(req, res) {
        const usuario = req.params.usuario;

        Bill.getAllByUser(usuario, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar los locales',
                    error: err
                });
            }

            data.forEach(boleta => {
                if (typeof boleta.detalle === 'string') {
                    try {
                        boleta.detalle = JSON.parse(boleta.detalle);
                    } catch (e) {
                        console.log('Error parseando boleta.detalle:', e, boleta.detalle);
                        boleta.detalle = [];
                    }
                }
            });

            return res.status(201).json(data);
        });
    },
    getTrimedDateArray(req, res) {
        
        const usuario = req.params.usuario;
        const inicial = req.params.inicial;
        const fin = req.params.fin;

        Bill.getTrimedDateArray(usuario, inicial, fin, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar los locales',
                    error: err
                });
            }
            data.forEach(boleta => {
                if (typeof boleta.detalle === 'string') {
                    try {
                        boleta.detalle = JSON.parse(boleta.detalle);
                    } catch (e) {
                        console.log('Error parseando boleta.detalle:', e, boleta.detalle);
                        boleta.detalle = [];
                    }
                }
            });

            return res.status(201).json(data);
        });
    },
}

//ANTERIOR

/*const Parser = require("mysql/lib/protocol/Parser");
const Bill = require("../models/bill");
const BillDetail = require("../models/bill_detail");
const Stock = require("../models/stock");

module.exports = {
    async create(req, res) {

        const boleta = req.body;

        Bill.create(boleta, async (err, id) => {
            if (err) {
                console.log('Error en Bill.create:', err);
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de crear la orden',
                    error: err
                });
            }

            let errorEnDetalle = null;
            let errorEnStock = null;

            // Usar promesas para procesar los productos
            const procesarProducto = (producto) => {
                return new Promise((resolve, reject) => {
                    var totalLinea = parseInt(producto.precio_venta) * producto.cantidad;
                    BillDetail.create(id, producto.cantidad, producto.id, producto.precio_venta, totalLinea, (err, id_data) => {
                        if (err) {
                            console.log('Error en BillDetail.create:', err);
                            errorEnDetalle = err;
                            return reject(err);
                        }
                        Stock.discount(boleta.inventario, producto, (err, id_inventario) => {
                            if (err) {
                                console.log('Error en Stock.discount:', err);
                                errorEnStock = err;
                                return reject(err);
                            }
                            resolve();
                        });
                    });
                });
            };

            try {
                for (const producto of boleta.productos) {
                    await procesarProducto(producto);
                }
            } catch (err) {
                console.log('Error al procesar los productos:', err);
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al procesar los productos',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La boleta se ha creado exitosamente',
                data: `${id}`
            });
        });

    },
    getAllByUser(req, res) {
        const usuario = req.params.usuario;

        Bill.getAllByUser(usuario, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar los locales',
                    error: err
                });
            }

            data.forEach(boleta => {
                boleta.detalle = JSON.parse(boleta.detalle);
            });

            return res.status(201).json(data);
        });
    },
    getTrimedDateArray(req, res) {
        
        const usuario = req.params.usuario;
        const inicial = req.params.inicial;
        const fin = req.params.fin;

        Bill.getTrimedDateArray(usuario,inicial,fin, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar los locales',
                    error: err
                });
            }
            data.forEach(boleta => {
                boleta.detalle = JSON.parse(boleta.detalle);
            });

            return res.status(201).json(data);
        });
    },
  
}*/