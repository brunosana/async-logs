import { NestApplicationOptions } from '@nestjs/common';
import { Provider } from './modules/providers';

export type AppOptions = NestApplicationOptions & {
  providers: Array<Provider>;
};
