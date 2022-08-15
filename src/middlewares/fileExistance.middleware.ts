import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

export default (req: Request, res: Response, next: NextFunction): void => {
  let { filename } = req.query;

  // Check if filename provided
  if (!filename) {
    req.statusCode = 400;
    throw new Error('Filename is required');
  }

  // Check if file exists
  const filePath = `assets/original/${filename}`;
  if (!fs.existsSync(filePath)) {
    req.statusCode = 404;
    throw new Error('File not found');
  }

  next();
};
