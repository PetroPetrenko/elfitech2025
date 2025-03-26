import { validationResult } from 'express-validator';
import { ValidationError } from '../utils/errors.js';

export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new ValidationError(errors.array()));
    return;
  }
  next();
}