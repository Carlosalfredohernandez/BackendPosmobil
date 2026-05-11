const localController = require("../controllers/localController");

module.exports = (app) => {

    app.post('/api/locales/create', localController.create);
    app.get('/api/locales/findLocals/:usuario', localController.findLocals);
    app.put('/api/locales/update/:id', localController.update);
}