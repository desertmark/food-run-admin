import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from './config.service';
@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  async clientConfig() {
    try {
      return await this.configService.getClientConfig();
    } catch {
      throw new InternalServerErrorException(
        {},
        'Failed to get client config.',
      );
    }
  }
}
