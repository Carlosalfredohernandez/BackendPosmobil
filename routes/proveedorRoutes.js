const proveedorController = require("../controllers/proveedorController");

module.exports = (app) => {

    app.post('/api/proveedores/create', proveedorController.create);
    app.get('/api/proveedores/getProveedor/:usuario',proveedorController.getProveedor);
    // ...existing code...

    app.put('/api/proveedores/update', proveedorController.update);

// ...existing code...
}