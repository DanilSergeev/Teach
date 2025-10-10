const Router = require("express").Router;
const userRouter = require("./user-router");

const router = new Router();

router.use(userRouter);


module.exports = router;