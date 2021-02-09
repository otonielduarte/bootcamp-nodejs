import { Request } from 'express';

interface ICustomRequest<T> extends Request {
  body: T;
}

export default ICustomRequest;
