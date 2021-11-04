const { response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req, resp = response, next) =>{

    //Manejo de los errores
    const error = validationResult(req);
    //console.log(error)

    if (!error.isEmpty()) {
        return resp.status(400).json({
            ok: false,
            errors: error.mapped()
        });
    }

    next();
}

module.exports = {
    validarCampos
}