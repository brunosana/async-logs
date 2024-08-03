export * from './modules/async-storage/async-storage.type';
import { NestFactory } from '@nestjs/core';
import { RootModule } from './modules';
import { AppOptions } from './types';
import { resolveProviders } from './modules/providers';
import { LoggingInterceptor } from './modules/interceptor';

export async function CreateApp(module: any, options: AppOptions) {
  const Module = RootModule.register(module);
  const app = await NestFactory.create(Module, options);
  const logger = await app.resolve(LoggingInterceptor);
  app.useGlobalInterceptors(logger);
  await resolveProviders(app, options.providers);

  return app;
}
