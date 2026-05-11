const userEntController = require('../controllers/usersEntController');

module.exports = (app) => {
    app.post('/api/usuariosempresa/create', userEntController.create);
    app.post('/api/usuariosempresa/login', userEntController.login);
    app.get('/api/usuariosempresa/findUsers/:usuario', userEntController.findUsers);
    app.put('/api/usuariosempresa/update/:idRol/:local', userEntController.update);
}