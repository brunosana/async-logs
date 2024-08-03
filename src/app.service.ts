import { Injectable } from '@nestjs/common';
import { UserRepository } from './mongo/repositories/user.repository';
import { ExternalApiService } from './external-api/external-api.service';

@Injectable()
export class AppService {
  constructor(
    private readonly repository: UserRepository,
    private readonly api: ExternalApiService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async create(name: string, age: number) {
    return await this.repository.create({ age, name });
  }
  async get() {
    return (await this.api.get()).data;
  }
}
