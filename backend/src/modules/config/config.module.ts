import { Module, Provider } from '@nestjs/common';
import { ConfigController } from './config.controller';
import { ConfigProvider } from './config.model';
import { ConfigService } from './config.service';
import { FirebaseService } from './firebase.service';
import { Logger } from './logger';

const providers: Provider[] = [
  Logger,
  ConfigProvider,
  FirebaseService,
  ConfigService,
];

@Module({
  controllers: [ConfigController],
  providers,
  exports: [...providers],
})
export class ConfigModule {}
