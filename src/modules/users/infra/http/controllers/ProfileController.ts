import { Request, Response } from 'express';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

import { container } from 'tsyringe';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    // const service = container.resolve(Users);

    return response.json({ user_id });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;
    const { id: user_id } = request.user;

    const service = container.resolve(UpdateProfileService);

    const user = await service.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(user);
  }
}
