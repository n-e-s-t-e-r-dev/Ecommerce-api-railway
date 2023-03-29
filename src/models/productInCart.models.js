const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const ProductInCart = db.define('product_in_cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sub_total: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
},
    {
        timestamps: false
    });



module.exports = ProductInCart; 