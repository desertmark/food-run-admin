import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { ScheduleController } from './schedule.controller';

@Module({
  imports: [ConfigModule],
  controllers: [ScheduleController],
  providers: [],
})
export class ScheduleModule {}
