import { Router } from "express";
import UserController from "../controllers/user.controller";

class UserRoutes {
  router = Router();
  controller = new UserController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new User
    this.router.post("/", this.controller.create);

    // Retrieve all Users
    this.router.get("/", this.controller.findAll);
  }
}

export default new UserRoutes().router;
