const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const Products = db.define('products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_image: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false
    }
},
    {
        timestamps: true,
        createdAt: false
    }
);


module.exports = Products;