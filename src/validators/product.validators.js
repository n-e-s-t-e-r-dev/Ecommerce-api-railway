const { check, param, body } = require("express-validator");
const validateResult = require("../utils/validate");


const createProductValidator = [
    body("name", "Error con el campo name")
        .exists()
        .withMessage("Debe existir la propiedad 'name'")
        .notEmpty()
        .withMessage("El campo name no debe estar vacio")
        .isString()
        .withMessage("El campo name debe ser un string")
        .isLength({ min: 6, max: 30 })
        .withMessage("El campo name debe tener entre 6 y 30 caracteres"),
    body("description", "Error con el campo description")
        .exists()
        .withMessage("Debe existir la propiedad 'description'")
        .notEmpty()
        .withMessage("El campo description no debe estar vacio")
        .isString()
        .withMessage("El campo description debe ser un string")
        .isLength({ min: 6 })
        .withMessage("El campo description debe tener minimo de 6 caracteres"),
    body("price", "Error con el campo price")
        .exists()
        .withMessage("Debe existir la propiedad 'price'")
        .notEmpty()
        .withMessage("El campo price no debe estar vacio"),
    body("stock", "error con el campor stock")
        .exists()
        .withMessage("Debe existir la propiedad 'stock'")
        .notEmpty()
        .withMessage("El campo stock no debe estar vacio"),
    body("file", "Error con el campo file")
        .exists()
        .withMessage("Debe existir la propiedad 'product_image'")
        .notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

const updateProductValidator = [
    param("id_product").isInt().withMessage("El id debe ser un numero entero"),
    check("description", "Error con el campo description")
        .exists()
        .withMessage("Debe existir la propiedad 'description'")
        .notEmpty()
        .withMessage("El campo description no debe estar vacio")
        .isString()
        .withMessage("El campo description debe ser un string")
        .isLength({ min: 6 })
        .withMessage("El campo description debe tener minimo de 6 caracteres"),
    (req, res, next) => {
        validateResult(req, res, next);
    },
]

module.exports = {
    createProductValidator,
    updateProductValidator,
};