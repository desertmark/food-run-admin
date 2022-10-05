import {
  Controller,
  Get,
  HttpException,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CONFIG_INJECTION_TOKEN, IConfig } from '../config/config.model';
import { FirebaseService } from '../config/firebase.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    @Inject(CONFIG_INJECTION_TOKEN) private readonly config: IConfig,
    private firebase: FirebaseService,
  ) {}

  @Get('/')
  async get(): Promise<any> {
    try {
      return await this.firebase.admin.auth().listUsers();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
