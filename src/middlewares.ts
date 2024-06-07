import { NextFunction, Request, Response } from 'express';

import { messagesService } from './services/messages';

import ErrorResponse from './interfaces/ErrorResponse';

const servicesSetup = false;
export function setupServices(req: Request, res: Response, next: NextFunction) {
  if (!servicesSetup) {
    console.log('Setting up services...');
    messagesService.setup().then(() => {
      next();
    });
    console.log('Services setup complete!');
  } else {
    next();
  }
}

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}
