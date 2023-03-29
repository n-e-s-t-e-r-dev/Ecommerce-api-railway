const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAILER_CONFIG_USER,
        pass: process.env.MAILER_CONFIG_PASS,
    },
});

module.exports = transporter;