const Router = require('express').Router;
const apiRoute = require('./api.route');
const appRoute = require('./app.route');

const indexRouter = Router();

indexRouter.use("/api/", apiRoute);
indexRouter.use("/app", appRoute);

module.exports = indexRouter;