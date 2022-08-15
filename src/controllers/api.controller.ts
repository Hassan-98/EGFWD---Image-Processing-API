import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { resizer } from "../utils/resizer.util";

export const getAndResizeImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { filename, width, height } = req.query;

    let imageWidth = 0;
    let imageHeight = 0;

    if (width) imageWidth = +width;
    if (height) imageHeight = +height;

    let resizedImage = await resizer({
      filename: filename as string,
      width: imageWidth,
      height: imageHeight
    });

    if (!resizedImage) throw new Error('Resizing failed');

    res.sendFile(path.resolve(__dirname, '../../', resizedImage));
  } catch (err) {
    next(err);
  }
}

export default {
  getAndResizeImage
}