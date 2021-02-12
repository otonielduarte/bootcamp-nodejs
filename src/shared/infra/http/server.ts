import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import { errors as validationErrors } from 'celebrate';
import 'express-async-errors';
import cors from 'cors';
import '@shared/infra/typeorm';
import '@shared/container';

import router from '@shared/infra/http/routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(router);

app.use(validationErrors);

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    // eslint-disable-next-line no-console
    console.error(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

export default app;
