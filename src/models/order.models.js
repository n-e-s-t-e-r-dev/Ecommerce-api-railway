const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const Order = db.define('order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    is_completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
    {
        timestamps: true,
        updatedAt: false
    });


module.exports = Order; 