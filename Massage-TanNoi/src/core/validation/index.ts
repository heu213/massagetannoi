import { Request } from 'express';
import { validationResult } from 'express-validator';
import { InputValidationError } from '../types/ErrorTypes';

export const validationHandler = (req: Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new InputValidationError(errors.array());
  }
}

