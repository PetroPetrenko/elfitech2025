import express from 'express';
import { body } from 'express-validator';
import { UserController } from '../controllers/UserController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();
const userController = new UserController();

// Validation rules
const createUserRules = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().notEmpty()
];

// Routes
router.get('/', 
  authenticate, 
  authorize(['admin']), 
  userController.getAll
);

router.get('/:id', 
  authenticate, 
  userController.getById
);

router.post('/',
  authenticate,
  authorize(['admin']),
  createUserRules,
  validate,
  userController.create
);

router.put('/:id',
  authenticate,
  createUserRules,
  validate,
  userController.update
);

router.delete('/:id',
  authenticate,
  authorize(['admin']),
  userController.delete
);

export { router as userRoutes };