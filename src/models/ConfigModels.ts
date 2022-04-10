export interface MongoConfig {
  user: string;
  host: string;
  name: string;
  password: string;
  port: number;
}

export interface TokenConfig {
  accessTokenValidityDays: number;
  refreshTokenValidityDays: number;
  issuer: string;
  audience: string;
}
