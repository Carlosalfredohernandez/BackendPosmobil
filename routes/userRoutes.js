const userController = require('../controllers/usersController');

module.exports = (app) => {

    app.post('/api/usuarios/create', userController.register);
    app.post('/api/usuarios/login', userController.login);
}