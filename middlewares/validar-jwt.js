const { response, request } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = (req=request, resp=response, next) =>{

    //obtención del token registrado
    const token = req.header('x-token');
    //console.log(token);

    if (!token) {
        return resp.status(401).json({
            ok:false,
            msg:'No hay token en la petición'
        });
    }

    try {
        
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = payload.uid;
        req.name = payload.name;

        console.log(payload)

    } catch (error) {
        return resp.status(401).json({
            ok:false,
            msg: 'Token no valido'
        });
    }


    next();

}

module.exports = {
    validarJWT
}