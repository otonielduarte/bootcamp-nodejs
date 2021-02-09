import { Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService, {
  IRequest,
} from '@modules/appointments/services/ListProviderDayAvailabilityService';
import ICustomRequest from 'common/CustomRequest';

export default class ProviderDayAvailabilityController {
  public async index(
    request: ICustomRequest<IRequest>,
    response: Response,
  ): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.query;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const availability = await listProviderDayAvailability.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(availability);
  }
}
