const routes = require("express").Router();

const userController = require("../controllers/userController");

routes.post("/user", userController.signup);
routes.get("/user/:id", userController.getUserById);
routes.post("/user/login", userController.loginUser);
routes.patch("/user/:id", userController.updateUserProfile);

module.exports = routes;
