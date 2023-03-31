const { Sequelize } = require("sequelize");
require('dotenv').config()

const db = new Sequelize({
    database: process.env.DB_CONFIG_DATABASE,
    host: process.env.DB_CONFIG_HOST,
    port: process.env.DB_CONFIG_PORT,
    username: process.env.DB_CONFIG_USERNAME,
    password: process.env.DB_CONFIG_PASSWORD,
    dialect: "postgres",
    logging: false,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false}}
});

module.exports = db;