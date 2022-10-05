import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { UsersController } from './users.controller';

@Module({
  imports: [ConfigModule],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
