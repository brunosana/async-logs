import { DynamicModule } from '@nestjs/common';
import { MongooseProvider } from '../providers/mongoose/mongoose.provider';
import { AsyncStorageModule } from '../async-storage/async-storage.module';
import { LoggingInterceptor } from '../interceptor';
import { AppLogger } from '../logger';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { Httprovider } from '../providers/http/http.provider';

export class RootModule {
  static register(module: any): DynamicModule {
    return {
      module: RootModule,
      imports: [
        WinstonModule.forRoot({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
          transports: [
            new winston.transports.File({
              dirname: './log/',
              filename: 'info.log',
            }),
          ],
        }),
        AsyncStorageModule,
        module,
      ],
      providers: [AppLogger, MongooseProvider, Httprovider, LoggingInterceptor],
    };
  }
}
