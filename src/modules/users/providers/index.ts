import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BcryptProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptProvider);
