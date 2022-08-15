import path from 'path';
import sharp from 'sharp';

interface ResizerOptions {
  filename: string;
  width: number;
  height: number;
}

// Resizer Function
export const resizer = async ({
  filename,
  width,
  height,
}: ResizerOptions): Promise<false | string> => {
  let resizedImage: sharp.OutputInfo;

  let fileExt = path.extname(filename);
  let fileName = path.basename(filename, fileExt);

  let originalPath = `assets/original/${filename}`;
  let filePathResized = `assets/thumb/${fileName}${fileExt}`;

  if (width === 0 || height === 0) {
    resizedImage = await sharp(originalPath).toFile(filePathResized);
  } else {
    filePathResized = `assets/thumb/${fileName}_${width}x${height}${fileExt}`;
    resizedImage = await sharp(originalPath)
      .resize(width, height)
      .toFile(filePathResized);
  }

  if (!resizedImage) return false;

  return filePathResized;
};
