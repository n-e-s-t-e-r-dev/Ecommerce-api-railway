const UserServices = require("../services/user.services");
const AuthServices = require("../services/auth.services");
const bcrypt = require("bcrypt");

const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await UserServices.getUser(email);
        if (!user) {
            return next({
                status: 400,
                message: "Invalid email",
                errorName: "User not found",
            });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return next({
                status: 400,
                message: "The password doesn't match with email user",
                errorName: "Invalid password",
            });
        }

        const { id, username, avatar } = user;

        const token = AuthServices.genToken({ id, username, email });
        res.json({
            id,
            username,
            email,
            token,
            avatar
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    userLogin,
};