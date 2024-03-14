import { Application } from "express";
import UserRoutes from "./user.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/users", UserRoutes);
  }
}
