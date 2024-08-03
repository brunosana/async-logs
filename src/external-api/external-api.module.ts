import { DynamicModule, Module } from '@nestjs/common';
import { ExternalApiService } from './external-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [ExternalApiService],
  exports: [ExternalApiService],
})
export class ExternalApiModule {
  static register(): DynamicModule {
    return {
      module: ExternalApiModule,
      imports: [
        HttpModule.register({
          baseURL: 'https://localhost:3003',
        }),
      ],
    };
  }
}
