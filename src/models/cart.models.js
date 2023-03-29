const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const Cart = db.define('carts', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
},
{
  timestamps: false
});


module.exports = Cart; 