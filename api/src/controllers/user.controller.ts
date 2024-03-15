import { Request, Response } from "express";
import User from "../models/user.model";
import userRepository from "../repositories/user.repository";

export default class UserController {
  async create(req: Request, res: Response) {
    if (!req.body.name || !req.body.company || !req.body.email || !req.body.phone) {
      res.status(400).send({
        message: "Content cannot be empty!"
      });
      return;
    }

    try {
      const user: User = req.body;
      const savedUser = await userRepository.save(user);

      res.status(201).send(savedUser);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while posting user."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const users = await userRepository.retrieveAll();

      res.status(200).send(users);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving users from the controller."
      });
    }
  }

}
