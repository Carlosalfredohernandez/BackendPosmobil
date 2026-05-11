const productsController = require('../controllers/productsController');
const passport = require('passport');

module.exports = (app, upload) => {

    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    app.get('/api/productos/getAllByUser/:usuario', productsController.getAllByUser);
    app.get('/api/productos/getProducto/:codigoBarra', productsController.getProduct);
    app.get('/api/productos/findByCategory/:categoria', productsController.findByCategory);
    //app.get('/api/productos/findByNameAndCategory/:id_category/:name',  productsController.findByNameAndCategory);
    app.post('/api/productos/create', productsController.create);
    app.put('/api/productos/update', productsController.update);
    app.get('/api/productos/deshabilitar/:productId', productsController.deshabilitar);
    app.get('/api/productos/findProductsOnText/:text/:id_usuario', productsController.findProductsOnText);
    app.get('/api/productos/findProductsOnTextWithCategory/:category/:text/:id_usuario', productsController.findProductsOnTextWithCategory);

}