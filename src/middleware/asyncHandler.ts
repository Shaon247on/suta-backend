import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AsyncRequestHandler } from '../types';

/**
 * Wraps an async route handler to catch any errors and pass them to Express's error handling middleware.
 * Without this, unhandled promise rejections can crash the server.
 */
export const asyncHandler = (handler: AsyncRequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};