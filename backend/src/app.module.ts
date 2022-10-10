import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AuthModule,
  ConfigModule,
  ScheduleModule,
  UsersModule,
} from './modules';

@Module({
  imports: [ConfigModule, AuthModule, UsersModule, ScheduleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
