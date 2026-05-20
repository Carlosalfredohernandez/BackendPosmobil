
const UserE = require('../models/userEnterprise');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Keys = require('../config/keys');
module.exports= {
        create(req, res) {

        const userE = req.body;

        UserE.create(userE, (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            console.log('Usuario empresa enviado al front (create):', id);
            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: id
            });
        });
    },

    login(req, res) {

        console.log('REQ BODY:', req.body);

        const rut = req.body.rut;
        const clave = req.body.clave;
        console.log('login - clave recibida:', clave);

        UserE.findByRut(rut, async (err, myUser) => {
            if(err) {
                return res.status(501).json({
                    success: false,
                    menssage: 'Hubo un error al buscar el rut del usuario.',
                });
            }

            if(!myUser) {
                return res.status(401).json({
                    success: false,
                    menssage: 'El rut no fue encontrado.',
                    error: err
                });
            }

            console.log('login - password en base de datos:', myUser.password);
            const isClaveValid = await bcrypt.compare(clave, myUser.password);

            if (isClaveValid) {
                // Generar token JWT igual que en usersController.js
                const token = jwt.sign({id: myUser.id, correo: myUser.correo}, Keys.secretOrKey, {});
                myUser.session_token = `JWT ${token}`;

                console.log('Usuario empresa enviado al front (login):', myUser);
                return res.status(201).json({
                    success: true,
                    menssage: 'Rut encontrado exitosamente, cargando perfil de usuario...',
                    data: myUser
                });
            } else {
                return res.status(401).json({
                    success: false,
                    menssage: 'la contraseña es incorrecta',
                    error: err
                });
            }
        });

    },

    findUsers(req , res) {

        const usuario = req.params.usuario;
        
        UserE.findUsers(usuario,(err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar los usuarios',
                    error: err
                });
            }
            console.log('Usuarios empresa enviados al front (findUsers):', data);
            return res.status(201).json(data);
        });
    },
        delete(req, res) {
            const id = req.params.id;

            UserE.delete(id, (err, data) => {
                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error al eliminar el usuario',
                        error: err
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: 'Usuario eliminado correctamente',
                    data: data
                });
            });
        },
    async update(req, res) {

        console.log('REQ BODY:', req.body);


        // Asegurar que el campo 'clave' se asigne desde 'password' si existe
        if (req.body.password && req.body.password.trim() !== '') {
            req.body.clave = req.body.password;
        }
        // Si no hay password, no se actualiza clave

        const usuario = req.body;
        const id_rol = req.params.idRol;
        const id_local = req.params.local;
        console.log('update - req.body (usuario):', usuario);
        console.log('update - req.params.idRol:', id_rol);
        console.log('update - req.params.local:', id_local);

        User.update(usuario, (err, data) => {
            console.log('update - resultado User.update:', { err, data });

            if (err) {
                console.error('update - error en User.update:', err);
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el update del usuario Empresa',
                    error: err
                });
            }
            User.updateRol(usuario.id, id_rol, (err, myData) => {
                console.log('update - resultado User.updateRol:', { err, myData });

                if (err) {
                    console.error('update - error en User.updateRol:', err);
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el update del rol',
                        error: err
                    });
                }

                const user ={
                    rol: id_rol,
                    local_asignado: id_local,
                    rut: usuario.rut
                }
                console.log('update - datos para UserE.update:', user);

                UserE.update(user, (err, data2) => {
                    console.log('update - resultado UserE.update:', { err, data2 });

                    if (err) {
                        console.error('update - error en UserE.update:', err);
                        return res.status(501).json({
                            success: false,
                            message: 'Hubo un error con el update del usuario',
                            error: err
                        });
                    }

                    console.log('Usuario empresa enviado al front (update):', data2);
                    return res.status(201).json({
                        success: true,
                        message: 'El update se realizo correctamente',
                        data: data2
                    }); 
                });       
    
            });   
        });
    },
}