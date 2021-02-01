import { Request, Response } from 'express';
import UpdateAvatarService from '@modules/users/services/UpdateAvatarService';

import { container } from 'tsyringe';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const avatarService = container.resolve(UpdateAvatarService);

    const user_id = request.user.id;
    const { filename } = request.file;

    const user = await avatarService.execute({ user_id, filename });

    return response.json({ success: true, user });
  }
}
