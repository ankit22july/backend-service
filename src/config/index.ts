import * as localEnv from 'dotenv';
import { Env } from './env';
import type { MongoConfig, TokenConfig } from '../models/ConfigModels';

localEnv.config();

export interface Config {
  port: number;
  env: string;
  mongoConfig: MongoConfig;
  tokenConfig: TokenConfig;
}

export function getConfig(): Config {
  return {
    port: Env.asInteger('PORT'),
    env: Env.asString('NODE_ENV', 'developement'),
    mongoConfig: {
      user: Env.asString('DB_USER'),
      password: Env.asString('DB_USER_PWD'),
      host: Env.asString('DB_HOST'),
      port: Env.asInteger('DB_PORT'),
      name: Env.asString('DB_NAME'),
    },
    tokenConfig: {
      accessTokenValidityDays: Env.asInteger('ACCESS_TOKEN_VALIDITY_SEC', '0'),
      refreshTokenValidityDays: Env.asInteger('REFRESH_TOKEN_VALIDITY_SEC', '0'),
      issuer: Env.asString('TOKEN_ISSUER'),
      audience: Env.asString('TOKEN_AUDIENCE'),
    },
  };
}
