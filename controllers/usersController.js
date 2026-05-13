const { findByRut } = require('../models/user');
const User = require('../models/user');
const Rol = require('../models/rol');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Keys = require('../config/keys');
//const User = require('../models/User');

// Normaliza roles: si es string lo parsea, si ya es array/objeto lo deja igual
function normalizeRoles(roles) {
    if (!roles) return [];
    if (typeof roles === 'string') {
        try { return JSON.parse(roles); } catch { return []; }
    }
    return roles;
}

function login(req, res) {
    const rut = req.body.rut;
    const clave = req.body.clave;
    User.findByRut(rut, async (err, myUser) => {
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
                email: myUser.email,
                region: myUser.region,
                comuna: myUser.comuna,
                calle: myUser.calle,
                numero: myUser.numero,
                telefono: myUser.telefono,
                session_token: `JWT ${token}`,
                tipo_contrato: myUser.tipo_contrato,
                roles: normalizeRoles(myUser.roles)
            }
            console.log('Usuario enviado al front (login):', data);
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
}

function findUsers(req , res) {
    const id = req.params.id;
    User.findUsers(id,(err, data) => {
        if (err) {
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al momento de listar los usuarios',
                error: err
            });
        }
        data.forEach(user => {
            user.roles = normalizeRoles(user.roles);
        });
        console.log('Usuarios enviados al front (findUsers):', data);
        return res.status(201).json(data);
    });
}

function register(req, res) {
	const user = req.body;
	const rol = req.params.rol;
	console.log('Datos recibidos en register:', { user, rol });

    // Buscar por rut o email
    User.findByRutOrEmail(user.rut, user.email, (err, existingUser) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error al buscar rut/email en la base de datos',
                error: err
            });
        }
        if (existingUser) {
            let msg = '';
            if (existingUser.rut === user.rut) msg = 'El rut ya está registrado en el sistema';
            else if (existingUser.email === user.email) msg = 'El email ya está registrado en el sistema';
            else msg = 'Rut o email ya registrados';
            return res.status(409).json({
                success: false,
                message: msg
            });
        }

        // Si no existe, crear el usuario
        User.create(user, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    menssage: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }
            user.id = `${data}`;
            const token = jwt.sign({ id: user.id, correo: user.correo }, Keys.secretOrKey, {});
            user.session_token = `JWT ${token}`;
            Rol.create(user.id, rol, (err, data) => {
                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el registro del rol de usuario',
                        error: err
                    });
                }
                console.log('Usuario enviado al front (register):', user);
                return res.status(201).json({
                    success: true,
                    message: 'El registro se realizo correctamente',
                    data: user
                });
            });
        });
    });
}

async function update(req, res) {
    const user = req.body;
    console.log('update - req.body:', user);
    User.update(user, (err, data) => {
        console.log('update - resultado User.update:', { err, data });
        if (err) {
            console.error('update - error en User.update:', err);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el update del usuario',
                error: err
            });
        }
        User.findByRut(data, (err, myData) => {
            console.log('update - resultado User.findByRut:', { err, myData });
            if (err) {
                console.error('update - error en User.findByRut:', err);
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el update del usuario',
                    error: err
                });
            }
            myData.session_token = user.session_token;
            myData.roles = normalizeRoles(myData.roles);
            console.log('Usuario enviado al front (update):', myData);
            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: myData
            });
        })      
    });
}

function updateRol(req, res) {
    const user_id = req.params.idUser;
    const id_rol = req.params.idRol;
    User.updateRol(user_id, id_rol, (err, data) => {
        if (err) {
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el update del usuario',
                error: err
            });
        }
        return res.status(201).json({
            success: true,
            message: 'El registro se realizo correctamente',
            data: data
        });        
    });
}

function getAll(req, res) {
    User.getAll((err, users) => {
        if (err) return res.status(500).json({ error: err });
        console.log('Usuarios enviados al front (getAll):', users);
        res.json(users);
    });
}

module.exports = {
    login,
    findUsers,
    register,
    update,
    updateRol,
    getAll
};