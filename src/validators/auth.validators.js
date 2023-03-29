const { check, param } = require("express-validator");
const validateResult = require("../utils/validate");

const authValidator = [
    check("email", "Error con el correo electronico")
        .exists()
        .withMessage("No se encontro la propiedad email")
        .notEmpty()
        .withMessage("No se encontro un valor para la propiedad 'email'")
        .isString()
        .withMessage("la propiedad email debe ser un string")
        .isLength({ min: 7, max: 50 })
        .withMessage("EL correo debe tener una longitud entre 7 y 50 caracteres")
        .isEmail()
        .withMessage("El correo no tiene un formato correcto"),
    check("password", "Error con la contraseña")
        .exists()
        .withMessage("No se encontro la propiedad password")
        .notEmpty()
        .withMessage("No se encontro un valor para la propiedad password")
        .isString()
        .withMessage("la propiedad password debe ser un string")
        .isLength({ min: 7 })
        .withMessage("password debe tener una longitud minima de 7 caracteres"),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

module.exports = {
    authValidator
}