import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/UserRepository.js';
import { ValidationError } from '../utils/errors.js';

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAll() {
    return this.userRepository.findAll();
  }

  async getById(id) {
    return this.userRepository.findById(id);
  }

  async create(userData) {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new ValidationError('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return this.userRepository.create({
      ...userData,
      password: hashedPassword
    });
  }

  async update(id, userData) {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    return this.userRepository.update(id, userData);
  }

  async delete(id) {
    return this.userRepository.delete(id);
  }
}