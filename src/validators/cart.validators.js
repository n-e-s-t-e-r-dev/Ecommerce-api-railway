const { check, param } = require("express-validator");
const validateResult = require("../utils/validate");


const addToCartValidator = [
    check("product_id", "Error con el campo product_id")
        .exists()
        .withMessage("Debe existir la propiedad 'product_id'")
        .notEmpty()
        .withMessage("El campo product_id no debe estar vacio")
        .isInt()
        .withMessage("El campo product_id debe ser un numero entero"),
    check("quantity", "error con el campor quantity")
        .exists()
        .withMessage("Debe existir la propiedad 'quantity'")
        .notEmpty()
        .withMessage("El campo quantity no debe estar vacio")
        .isInt()
        .withMessage("El campo quantity debe ser un numero entero"),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

module.exports = {
    addToCartValidator,
}