import { Router } from "express";
import { login } from "../controllers/login_controller.js";

const routes = new Router();

routes.post('/api/login', login);

export default routes;