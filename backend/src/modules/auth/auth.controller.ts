import { Controller, Get, Inject } from '@nestjs/common';
import { CONFIG_INJECTION_TOKEN, IConfig } from '../config/config.model';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(CONFIG_INJECTION_TOKEN) private readonly config: IConfig,
  ) {}

  @Get('/login')
  login(): { url: string } {
    return {
      url: this.config.auth.discoveryUrl,
    };
  }
}
