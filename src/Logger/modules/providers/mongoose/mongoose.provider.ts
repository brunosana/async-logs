import { Injectable } from '@nestjs/common';
import { AppStorage } from '../../async-storage/async-storage.type';
import { AppLogger } from '../../logger';

@Injectable()
export class MongooseProvider {
  constructor(
    private readonly localStorage: AppStorage,
    private readonly logger: AppLogger,
  ) {}

  run(collection: string, method: string, query: any) {
    const id = this.localStorage.getStore().requestId;
    this.logger.log({
      id,
      type: 'mongo-iteraction',
      collection,
      method,
      query,
    });
  }
}
