import { Injectable } from '@nestjs/common';
import { database } from 'firebase-admin';
import { FirebaseService } from './firebase.service';
import { Logger } from './logger';

@Injectable()
export class ConfigService {
  private clientConfig: database.Reference;

  constructor(
    private readonly firebaseService: FirebaseService,
    private logger: Logger,
  ) {
    this.clientConfig = this.firebaseService.admin
      .database()
      .ref('clientConfig');
  }

  async getClientConfig(): Promise<{ androidDownloadUrl: string }> {
    try {
      const snapshot = await this.clientConfig.get();
      return snapshot.val();
    } catch (error) {
      this.logger.error('Failed to fetch client config from firebase', {
        error,
      });
      throw error;
    }
  }
}
