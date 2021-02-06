/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

import { container } from 'tsyringe';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const service = container.resolve(ShowProfileService);
    const user = await service.execute({ user_id });

    const { password, ...userResponse } = user;

    return response.json({ userResponse });
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

    const { password: userPassoword, ...userResponse } = user;

    return response.json(userResponse);
  }
}
