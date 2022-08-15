import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';

export default (req: Request, res: Response, next: NextFunction): void => {
  let { filename, width, height } = req.query;

  let imageWidth = 0;
  let imageHeight = 0;

  if (width) imageWidth = +width;
  if (height) imageHeight = +height;

  let fileExt = path.extname(filename as string);
  let fileName = path.basename(filename as string, fileExt);

  let filePathResized = `assets/thumb/${fileName}${fileExt}`;

  if (imageWidth !== 0 && imageHeight !== 0) {
    filePathResized = `assets/thumb/${fileName}_${width}x${height}${fileExt}`;
  }

  fs.existsSync(filePathResized)
    ? res.sendFile(path.resolve(__dirname, '../../', filePathResized))
    : next();
};
