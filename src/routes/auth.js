import express from 'express';
import { body } from 'express-validator';
import { AuthController } from '../controllers/AuthController.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();
const authController = new AuthController();

const loginRules = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
];

router.post('/login', loginRules, validate, authController.login);
router.post('/register', loginRules, validate, authController.register);

export { router as authRoutes };