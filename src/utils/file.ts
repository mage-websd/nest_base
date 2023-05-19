import { HttpException, HttpStatus } from "@nestjs/common";
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { generate } from 'randomstring';
import config from "src/config";

// Multer upload options
export const multerImage = (options: any={}) => {
  const multerOption = {
    // Enable file size limits
    limits: {
      fileSize: options.size ?? 5242880, // 5M
    },
    // Check the mimetypes to allow for upload
    fileFilter: (req: any, file: any, cb: any) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        // Allow storage of file
        cb(null, true);
      } else {
        // Reject file
        cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
      }
    },
    // Storage properties
    storage: diskStorage({
      // Destination storage path details
      destination: (req: any, file: any, cb: any) => {
        let uploadPath = config.storagedir;
        if (options.subpath) {
          uploadPath += options.subpath + '/';
        }
        // Create folder if doesn't exist
        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
      },
      // File modification details
      filename: (req: any, file: any, cb: any) => {
        // Calling the callback passing the random name generated with the original extension name
        cb(null, `${generate(16)}${Date.now()}${extname(file.originalname)}`);
      },
    }),
  }
  return multerOption;
};

export const getPathUrlFile = (file: any): string => {
  return file.destination.replace(config.basedir + 'public', '') + file.filename;
}
