const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const ProductInOrder = db.define('product_in_orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    order_id: {
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
}, {
    timestamps: false
});

module.exports = ProductInOrder; 