import express from "express";
import * as roleController from "../controllers/roleController.js";

const routes = express.Router();

routes.get("/roles", roleController.getAllRoles);
routes.post("/role", roleController.addRole);
routes.delete("/role/:id", roleController.deleteRole);
routes.get("/role/:id", roleController.getRoleById);

export default routes;
