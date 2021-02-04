import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const directory = path.resolve(__dirname, '..', '..', 'temp');

export default {
  uploadFolder: path.resolve(directory, 'uploads'),
  directory,
  storage: multer.diskStorage({
    destination: directory,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
