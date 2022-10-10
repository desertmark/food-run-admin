import { Controller, Get, HttpException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { FirebaseService } from '../config/firebase.service';

@Controller('schedule')
@UseGuards(AuthGuard)
export class ScheduleController {
  constructor(private firebase: FirebaseService) {}

  @Get('/')
  async get(): Promise<any> {
    try {
      return {};
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
