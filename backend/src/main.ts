import { CONFIG_INJECTION_TOKEN, IConfig } from './modules/config/config.model';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<IConfig>(CONFIG_INJECTION_TOKEN);
  await app.listen(config.port);
}
bootstrap();
