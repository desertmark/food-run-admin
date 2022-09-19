import { Module } from '@nestjs/common';
import { ConfigProvider } from './config.model';

@Module({
  providers: [ConfigProvider],
  exports: [ConfigProvider],
})
export class ConfigModule {}
