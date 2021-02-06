import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';

import { container } from 'tsyringe';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const service = container.resolve(CreateUserService);

    const user = await service.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }
}
