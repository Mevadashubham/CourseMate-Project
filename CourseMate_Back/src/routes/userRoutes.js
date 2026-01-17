import express from "express";
import * as userController from "../controllers/userController.js";

const routes = express.Router();

routes.post("/user", userController.signup);
routes.get("/user/:id", userController.getUserById);
routes.post("/user/login", userController.loginUser);
routes.patch("/user/:id", userController.updateUserProfile);

export default routes;
