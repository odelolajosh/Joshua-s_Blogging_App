const Router = require('express').Router;
const authRoute = require('./auth.route');
const postRoute = require('./post.route');

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
  res.render('index')
})

apiRouter.use("/", authRoute);

apiRouter.use("/post", postRoute);

module.exports = apiRouter;