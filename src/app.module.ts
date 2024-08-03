import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './mongo/mongo.module';
import { ExternalApiModule } from './external-api/external-api.module';

@Module({
  imports: [MongoModule, ExternalApiModule.register()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
