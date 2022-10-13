import { CONFIG_INJECTION_TOKEN, IConfig } from './modules/config/config.model';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from './modules/auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  const config = app.get<IConfig>(CONFIG_INJECTION_TOKEN);
  const authService = app.get<AuthService>(AuthService);
  await authService.createAdmin();
  await app.listen(config.port);
}
bootstrap();
