import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthService from '@modules/users/services/AuthService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authService = container.resolve(AuthService);

    const { user, token } = await authService.execute({ email, password });

    return response.json({ user, token });
  }
}
