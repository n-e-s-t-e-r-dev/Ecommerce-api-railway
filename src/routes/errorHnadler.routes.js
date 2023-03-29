const {
    logError,
    errorHandler,
    ormErrorHandler,
} = require("../middlewares/error.handler");


const errorHandlerRouter = (app) => {
    app.use(logError);
    app.use(ormErrorHandler);
    app.use(errorHandler);

    app.use("*", (req, res) => {
        return res
            .status(404)
            .send("Error no atendido");
    });
};

module.exports = errorHandlerRouter;