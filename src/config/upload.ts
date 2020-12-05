import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tempPath = path.resolve(__dirname, '..', '..', 'temp');

export default {
  directory: tempPath,
  storage: multer.diskStorage({
    destination: tempPath,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
