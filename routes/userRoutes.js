const userController = require('../controllers/usersController');

module.exports = (app) => {

    app.get('/api/usuarios/findUsers/:id', userController.findUsers);
    app.post('/api/usuarios/create/:rol', userController.register);
    app.post('/api/usuarios/login', userController.login);
    app.put('/api/usuarios/update', userController.update);
    app.get('/api/usuarios/updateRol/:idUser/:idRol', userController.updateRol);
    app.get('/api/usuarios/all', userController.getAll);
}