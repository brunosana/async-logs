import { INestApplication } from '@nestjs/common';
import { Provider } from './types';
import { MongooseProvider } from './mongoose/mongoose.provider';
import { Httprovider } from './http/http.provider';

export * from './types';

export const providersExec: Record<
  string,
  (app: INestApplication, ...args: any[]) => Promise<void>
> = {
  mongoose: async (app) => {
    const mongoose = await import('mongoose');
    const module = await app.resolve(MongooseProvider);

    mongoose.set('debug', (collectionName, method, query) => {
      module.run(collectionName, method, query);
    });
  },
  http: async (app) => {
    const { HttpService } = await import('@nestjs/axios');
    const service = await app.resolve(HttpService);
    const module = await app.resolve(Httprovider);

    service.axiosRef.interceptors.request.use(
      (req) => module.onRequest(req),
      (err) => module.onRequestRejected(err),
    );
    service.axiosRef.interceptors.response.use(
      (req) => module.onResponse(req),
      (err) => module.onResponseError(err),
    );
  },
};

export async function resolveProviders(
  app: INestApplication<any>,
  providers: Array<Provider>,
) {
  for (const provider of providers) {
    await providersExec[provider.name].call(this, app);
  }
}
