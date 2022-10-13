import { Provider } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { join } from 'path';

const path = join(__dirname, '..', '..', '..', '.env');
dotenv.config({
  path,
});

const {
  PORT,
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDERID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_DATABASE_URL,
  FIREBASE_BASE_64_SERVICE_ACCOUNT,
  AUTH_APP_ID,
  AUTH_APP_SECRET,
  AUTH_DISCOVERY_URL,
  AUTH_ADMIN_EMAIL,
} = process.env;

export interface IConfig {
  port: string;
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
    serviceAccount: string;
    databaseUrl: string;
  };
  auth: {
    clientId: string;
    discoveryUrl: string;
    clientSecret: string;
    adminEmail: string;
  };
}

export const config: IConfig = {
  port: PORT || '80',
  firebase: {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDERID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID,
    serviceAccount: FIREBASE_BASE_64_SERVICE_ACCOUNT,
    databaseUrl: FIREBASE_DATABASE_URL,
  },
  auth: {
    clientId: AUTH_APP_ID,
    clientSecret: AUTH_APP_SECRET,
    discoveryUrl: AUTH_DISCOVERY_URL,
    adminEmail: AUTH_ADMIN_EMAIL,
  },
};

export const CONFIG_INJECTION_TOKEN = 'CONFIG';
export const ConfigProvider: Provider = {
  provide: CONFIG_INJECTION_TOKEN,
  useValue: config,
};
