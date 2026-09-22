import { Request, Response, NextFunction } from 'express';

// Extend Express Request with custom properties
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    avater?: string;
    role: 'user' | 'admin';
  };
}

// Custom error interface
export interface AppError extends Error {
  statusCode: number;
  code?: string;
  isOperational?: boolean;
}

// API response structure
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: number;
    message: string;
  };
}

// Async handler type
export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;