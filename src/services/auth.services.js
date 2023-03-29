const jwt = require("jsonwebtoken");

class AuthServices {
    static genToken(payload) {
        try {
            const token = jwt.sign(payload, process.env.JWT_CONFIG_SECRET, {
                algorithm: process.env.JWT_CONFIG_ALGORITHM,
                expiresIn: process.env.JWT_CONFIG_EXPIRESIN,
            });
            return token;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthServices;