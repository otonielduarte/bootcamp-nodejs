import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

interface IUploadConfig {
  driver: 'disk' | 's3';

  directory: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    disk: {};

    aws: {
      bucket: string;
    };
  };
}

const directory = path.resolve(__dirname, '..', '..', 'temp');

export default {
  driver: process.env.STORAGE_DRIVER,

  directory,
  uploadsFolder: path.resolve(directory, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: directory,
      filename(request, file, callback) {
        const filehash = crypto.randomBytes(10).toString('hex');
        const fileName = `${filehash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: 'bootcamp-gobarber-2',
    },
  },
} as IUploadConfig;
