const Router = require("express").Router;
const userController = require("../controllers/user-controller");

const router = new Router();

router.post('/register',userController.registration);
router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUser );

module.exports = router;