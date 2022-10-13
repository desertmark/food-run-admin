import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_INJECTION_TOKEN, IConfig } from '../config/config.model';
import { FirebaseService } from '../config/firebase.service';
import { Logger } from '../config/logger';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CONFIG_INJECTION_TOKEN) private readonly config: IConfig,
    private readonly logger: Logger,
    private firebase: FirebaseService,
  ) {}
  async createAdmin() {
    try {
      const user = await this.firebase.admin
        .auth()
        .getUserByEmail(this.config.auth.adminEmail);
      await this.firebase.admin
        .auth()
        .setCustomUserClaims(user.uid, { role: 'admin' });
      this.logger.log(
        `Admin created with email ${this.config.auth.adminEmail}`,
      );
    } catch (error) {
      console.error('Failed to add role claim', {
        error,
        adminEmail: this.config.auth.adminEmail,
      });
    }
  }
}
