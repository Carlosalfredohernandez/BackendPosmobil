const Local = require('../models/local');

module.exports = {
    update(req, res) {
        const local = req.body;
        local.id = req.params.id;
        Local.update(local, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al actualizar el local',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'El local se actualizó correctamente',
                data: data
            });
        });
    },

    create(req, res) {

        const local = req.body;

        Local.create(local, (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El local se creo correctamente',
                data: `${id}` // EL ID DE LA NUEVA CATEGORIA
            });

        });

    },
    findLocals(req , res) {
        
        const usuario = req.params.usuario;

        Local.findLocals(usuario,(err, data) => {
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