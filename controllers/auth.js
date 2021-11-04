const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helper/jwt');

const newUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.send(400).json({
                ok: false,
                msg: 'Ya existe alguien registrado con este Email, por favor verifique y vuela a intentar'
            });
        }

        usuario = new Usuario(req.body);

        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //generar token JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.send(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    }
    catch (error) {
        console.log(error);

        res.send(501).json({
            ok: false,
            msg: 'Por favor contacte con el administrador!!'
        })
    }
}

const loginUser = async (req, resp = response) => {

    const { email, password } = req.body;
    try {

        let usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return resp.send(400).json({
                ok: false,
                msg: 'Usuario no exite con email'
            });
        }

        //Confirmar el passwoard
        const validarPassword = bcrypt.compareSync(password, usuario.password);

        if (!validarPassword) {
            return resp.send(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        resp.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    }
    catch (error) {
        console.log(error);

        resp.send(501).json({
            ok: false,
            msg: 'Por favor contacte con el administrador!!'
        })
    }
};

const revalidatedToken = async(req, resp = response) => {

    const {uid, name} = req;
    //Validacion de nuevo token
    const token = await generarJWT(uid, name);

    resp.json({
        ok: true,
        token
    });
};

module.exports = {
    newUser,
    loginUser,
    revalidatedToken
}