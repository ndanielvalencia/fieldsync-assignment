import { Op } from "sequelize";
import User from "../models/user.model";

interface IUserRepository {
  save(user: User): Promise<User>;
  retrieveAll(): Promise<User[]>;
}

class UserRepository implements IUserRepository {
  async save(user: User): Promise<User> {
    try {
      return await User.create({
        name: user.name,
        company: user.company,
        email: user.email,
        phone: user.phone,
      });
    } catch (err) {
      throw new Error("Failed to create User!");
    }
  }

  async retrieveAll(): Promise<User[]> {
    try {
      return await User.findAll();
    } catch (error) {
      throw new Error("Failed to retrieve Users!");
    }
  }

}

export default new UserRepository();
