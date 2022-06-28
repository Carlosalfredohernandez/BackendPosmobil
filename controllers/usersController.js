const { findByRut } = require('../models/user');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Keys = require('../config/keys');

module.exports = {

    login(req, res) {

        const rut = req.body.rut;
        const clave = req.body.clave;

        User,findByRut(rut, async (err, myUser) => {

            if(err) {
                return res.status(501).json({

                    success: false,
                    menssage: 'Hubo un error al buscar el rut del usuario.',

                });
            }

            //Autorizacion
            if(!myUser) {
                return res.status(401).json({

                    success: false,
                    menssage: 'El rut no fue encontrado.',
                    error: err
                });
            }

            const isClaveValid = await bcrypt.compare(clave, myUser.clave);

            if (isClaveValid) {
                const token = jwt.sign({id: myUser.id, correo: myUser.correo}, Keys.secretOrKey, {});

                const data ={
                    id: `${myUser.id}`,
                    nombre: myUser.nombre,
                    rut: myUser.rut,
                    correo: myUser.correo,
                    session_token: `JWT ${token}`
                }

                return res.status(201).json({
                    success: true,
                    menssage: 'Rut encontrado exitosamente, cargando perfil de usuario...',
                    data:data
    
                });
            }

            else{
                return res.status(401).json({

                    success: false,
                    menssage: 'la contraseña es incorrecta',
                    error: err
                });
            }

        });

    },

    register(req, res){

        const user = req.body;
        User.create(user, (err, data) => {

            if (err){

                return res.status(501).json({

                    success: false,
                    menssage: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            user.id = `${data}`;
            const token = jwt.sign({id: user.id, correo: user.correo}, Keys.secretOrKey, {});
            user.session_token = `JWT ${token}`;

            Rol.create(user.id, 3, (err, data) => {
                
                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el registro del rol de usuario',
                        error: err
                    });
                }
                
                return res.status(201).json({
                    success: true,
                    message: 'El registro se realizo correctamente',
                    data: user
                });

            });

        });  
    }
}