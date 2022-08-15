import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { resizer } from '../utils/resizer.util';

const getAndResizeImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { filename, width, height } = req.query;

    let imageWidth = 0;
    let imageHeight = 0;

    // Check if width is provided and valid
    if (width) {
      if (isNaN(+width)) {
        req.statusCode = 400;
        throw new Error('Image width must be a number');
      }
      imageWidth = +width;
    }

    // Check if height is provided and valid
    if (height) {
      if (isNaN(+height)) {
        req.statusCode = 400;
        throw new Error('Image height must be a number');
      }
      imageHeight = +height;
    }

    let resizedImage = await resizer({
      filename: filename as string,
      width: imageWidth,
      height: imageHeight,
    });

    if (!resizedImage) {
      req.statusCode = 500;
      throw new Error('Resizing failed');
    }

    res.sendFile(path.resolve(__dirname, '../../', resizedImage));
  } catch (err) {
    next(err);
  }
};

export default {
  getAndResizeImage,
};
