const { Router } = require('express');
const { check } = require('express-validator');
const { newUser, loginUser, revalidatedToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new',
    [//Middelewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El Email no es correcto').isEmail(),
        check('password', 'El password debe de tener por lo menos 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    newUser
);

router.post('/',
    [//Middelewares
        check('email', 'El Email no es correcto').isEmail(),
        check('password', 'El password debe de tener por lo menos 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUser
);

router.get('/renew',validarJWT, revalidatedToken);

module.exports = router;