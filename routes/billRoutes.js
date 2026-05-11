const billsController = require("../controllers/billsController");

module.exports = (app) => {

    app.post('/api/boletas/create', billsController.create);
    app.get('/api/boletas/getAllByUser/:usuario', billsController.getAllByUser);
    app.get('/api/boletas/getTrimedDateArray/:usuario/:inicial/:fin', billsController.getTrimedDateArray);
    
}