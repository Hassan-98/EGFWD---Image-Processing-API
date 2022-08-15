import { Request, Response, NextFunction } from 'express';

export default (err: Error, req: Request, res: Response, next: NextFunction): Response => {
  let errorMessage = err.message;
  
  console.error('\n\x1b[31m%s\x1b[0m\n', errorMessage);
  console.error(err.stack);

  return res.status(500).json({ error: errorMessage });
}