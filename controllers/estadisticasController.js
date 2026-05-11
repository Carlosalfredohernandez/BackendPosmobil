const Estadisticas = require('../models/estadisticas');

module.exports = {
    getAllByUser(req, res) {
        const usuario = req.params.usuario;
        Estadisticas.getAllByUser(usuario, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al obtener las estadísticas por usuario',
                    error: err
                });
            }
            return res.status(201).json(data);
        });
    },

    getTrimedDateArray(req, res) {
        const usuario = req.params.usuario;
        const inicial = req.params.inicial;
        const fin = req.params.fin;
        Estadisticas.getTrimedDateArray(usuario, inicial, fin, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al obtener las estadísticas por rango de fechas',
                    error: err
                });
            }
            return res.status(201).json(data);
        });
    }
};
