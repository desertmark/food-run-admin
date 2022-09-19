import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  health(): any {
    return {
      ok: true,
      datetime: new Date().toISOString(),
    };
  }
}
