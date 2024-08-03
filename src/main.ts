import { AppModule } from './app.module';
import { CreateApp } from './Logger';

async function bootstrap() {
  const app = await CreateApp(AppModule, {
    providers: [
      { name: 'mongoose', blackList: ['...'] },
      { name: 'http', ignorePatterns: [] },
    ],
  });
  await app.listen(3000);
}
bootstrap();
