const categoriesController = require('../controllers/categoriesController');
const passport = require('passport');

module.exports = (app) => {

    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    
    app.get('/api/categorias/getAll', categoriesController.getAll);
    app.get('/api/categorias/getAllByUser/:usuario', categoriesController.getAllByUser);
    app.get('/api/categorias/getNameById/:categoria', categoriesController.getNameById);
    app.post('/api/categorias/create', categoriesController.create);
    //,  passport.authenticate('jwt', { session: false })


}