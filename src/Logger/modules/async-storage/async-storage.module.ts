import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { randomUUID } from 'crypto';
import { AppStorage } from './async-storage.type';

@Module({
  providers: [
    {
      provide: AppStorage,
      useValue: new AsyncLocalStorage(),
    },
  ],
  exports: [AppStorage],
})
export class AsyncStorageModule implements NestModule {
  constructor(private readonly asyncStorage: AppStorage) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        const store = {
          userId: req.headers['x-user-id'],
          requestId: randomUUID(),
        };
        this.asyncStorage.run(store, () => next());
      })
      .forRoutes('*');
  }
}
