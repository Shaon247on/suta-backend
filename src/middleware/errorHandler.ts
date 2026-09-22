import { Request, Response } from 'express';
import { AppError } from '../types';
import { config } from '../config';

export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
): void => {
  // Determine status code and message
  const statusCode = 'statusCode' in err ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  // Log the full error internally (with request context)
  console.error(`[Error] ${statusCode} - ${message}`, {
    path: req.path,
    method: req.method,
    stack: err.stack,
  });

  // Send a safe, generic response in production
  res.status(statusCode).json({
    success: false,
    error: {
      code: statusCode,
      message: config.isProduction ? 'Something went wrong.' : message,
    },
  });
};