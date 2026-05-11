const Proveedor = require('../models/proveedor');

module.exports = {

    create(req, res) {

        const proveedor = req.body;

        Proveedor.create(proveedor, (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El provedoor se adjunto correctamente',
                data: `${id}` 
            });

        });

    },
    // ...existing code...

    update(req, res) {
        const proveedor = req.body;

        Proveedor.update(proveedor, (err, id) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al actualizar el proveedor',
                    error: err
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Proveedor actualizado correctamente',
                data: `${id}`
            });
        });
    },

// ...existing code...
    getProveedor(req , res) {
        
        const usuario = req.params.usuario;

        Proveedor.getProveedor(usuario,(err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar los proveedores',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },

}