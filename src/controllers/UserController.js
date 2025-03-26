import { UserService } from '../services/UserService.js';
import { logger } from '../utils/logger.js';

export class UserController {
  constructor() {
    this.userService = new UserService();
  }

  getAll = async (req, res, next) => {
    try {
      const users = await this.userService.getAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const user = await this.userService.getById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const user = await this.userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const user = await this.userService.update(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      await this.userService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}