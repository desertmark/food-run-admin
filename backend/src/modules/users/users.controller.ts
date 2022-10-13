import {
  Controller,
  Get,
  HttpException,
  Inject,
  UseGuards,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CONFIG_INJECTION_TOKEN, IConfig } from '../config/config.model';
import { FirebaseService } from '../config/firebase.service';
import { Logger } from '../config/logger';
import { UpdateUserRequest } from './user.models';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    @Inject(CONFIG_INJECTION_TOKEN) private readonly config: IConfig,
    private firebase: FirebaseService,
    private logger: Logger,
  ) {}

  @Get('/')
  async get(): Promise<any> {
    try {
      return await this.firebase.admin.auth().listUsers();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  @Patch('/:uid')
  async update(
    @Param('uid') uid: string,
    @Body() request: UpdateUserRequest,
  ): Promise<any> {
    try {
      const users = this.firebase.admin.auth();
      users.setCustomUserClaims(uid, { role: request.role });
      users.revokeRefreshTokens(uid);
      this.logger.log('User updated', { request });
    } catch (error) {
      this.logger.error('Failed to update user', { request, error, uid });
      throw error;
    }
  }
}
