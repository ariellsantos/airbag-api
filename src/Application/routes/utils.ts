import { validationResult } from 'express-validator';

import { NextFunction, Request, Response } from 'express';
export function validateReqSchema(req: Request, res: Response, next: NextFunction) {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }

  res.send({ errors: validationErrors.array() });
}
