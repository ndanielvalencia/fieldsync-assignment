import { Application } from "express";
import Server from "./src/index";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app: Application = express();

const server: Server = new Server(app);
const PORT: number = 8080;

app.listen(PORT, "localhost", function () {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
