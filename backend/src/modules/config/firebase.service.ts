import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_INJECTION_TOKEN, IConfig } from './config.model';
import firebaseAdmin, {
  app as FirebaseApp,
  AppOptions,
  credential,
} from 'firebase-admin';
import { Logger } from './logger';

@Injectable()
export class FirebaseService {
  public admin: FirebaseApp.App;
  constructor(
    @Inject(CONFIG_INJECTION_TOKEN) private readonly config: IConfig,
    private readonly logger: Logger,
  ) {
    this.initFirebaseAdmin();
  }

  initFirebaseAdmin() {
    try {
      const options: AppOptions = {
        projectId: this.config.firebase.projectId,
        databaseURL: this.config.firebase.databaseUrl,
        storageBucket: this.config.firebase.storageBucket,
        credential: FirebaseService.buildAdminCredentials(
          this.config.firebase.serviceAccount,
        ),
      };
      this.admin = firebaseAdmin.initializeApp(options);
      this.logger.debug('FirebaseAdmin initialized ok.');
    } catch (error) {
      this.logger.error('Failed to init firebase admin', error);
      throw error;
    }
  }

  static buildAdminCredentials = (
    serviceAccountKey: string,
  ): credential.Credential => {
    try {
      const serviceAccount = JSON.parse(
        Buffer.from(serviceAccountKey, 'base64').toString(),
      );
      console.log('Service account parsed');
      return credential.cert(serviceAccount);
    } catch (error) {
      console.error('Failed to parse FIREBASE_BASE_64_SERVICE_ACCOUNT');
    }
  };
}
