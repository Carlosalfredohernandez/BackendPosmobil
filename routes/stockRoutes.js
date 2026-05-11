const stockController = require("../controllers/stockController");

module.exports = (app) => {
    
    app.post('/api/inventario/create', stockController.create);
    app.get('/api/inventario/getAllByUser/:usuario', stockController.getAllByUser);
    app.get('/api/inventario/getByCodigo/:usuario/:producto', stockController.getByCodigo);
    app.get('/api/inventario/consultaInventario/:usuario', stockController.consultaInventario);
    app.get('/api/inventario/getAllByDate/:usuario/:inicial/:fin', stockController.getAllByDate);
}