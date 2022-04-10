import type { Request } from 'express';

export type ProtectedRequest = Request & {
  accessToken: string;
  user: string;
  keystore: string;
};
