const estadisticasController = require('../controllers/estadisticasController');

module.exports = (app) => {
    app.get('/api/estadisticas/byUser/:usuario', estadisticasController.getAllByUser);
    app.get('/api/estadisticas/byDate/:usuario/:inicial/:fin', estadisticasController.getTrimedDateArray);
};
