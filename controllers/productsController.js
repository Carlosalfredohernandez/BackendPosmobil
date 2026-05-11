const Product = require('../models/product');

module.exports = {

    findByCategory(req, res) {
        const categoria = req.params.categoria;

        Product.findByCategory(categoria, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las categorias',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },
    
    getAllByUser(req, res) {
        const usuario = req.params.usuario;

        Product.getAllByUser(usuario, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar los productos',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },

    getProduct(req, res) {
        const codigoBarra = req.params.codigoBarra;

        Product.getProduct(codigoBarra, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de traer el producto',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },
    
    findProductsOnText(req, res) {
       
        const id_usuario = req.params.id_usuario;
        const text = req.params.text;

        Product.findProductsOnText(text, id_usuario, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar los productos',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },

    findProductsOnTextWithCategory(req, res) {
       
        const category = req.params.category;
        const id_usuario = req.params.id_usuario;
        const text = req.params.text;

        Product.findProductsOnTextWithCategory(category,text, id_usuario, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar los productos',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },

    create(req, res) {

        const product = req.body;

        Product.create(product, (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del producto',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El producto se creo correctamente',
                data: `${id}` // EL ID DEL NUEVO PRODUCTO
            });

        });
    },
    deshabilitar (req, res){

        const product = req.params.productId;

        Product.deshabilitar(product, (err, data) => {
        
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al deshabilitar el producto',
                    error: err
                });
            }
            
            return res.status(201).json({
                success: true,
                message: 'Se ha deshabilitado el producto',
                data: data
            });
        });
    },

    async update(req, res) {

        const product = req.body;

        Product.update(product, (err, data) => {
            
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el update del producto',
                    error: err
                });
            }
            Product.findById(data, (err, myData) => {
                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el update del producto',
                        error: err
                    });
                }
                return res.status(201).json({
                    success: true,
                    message: 'El registro se realizo correctamente',
                    data: myData
                });
            })  

        });

    },

}