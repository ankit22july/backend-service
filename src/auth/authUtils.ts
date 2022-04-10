import { AuthFailureError, InternalError } from '../core/ApiError';
import { Types } from 'mongoose';
import { getConfig } from '../config';
import JWT, { JwtPayload } from '../core/JWT';
import type { TokenConfig } from '../models/ConfigModels';
import type { Tokens } from '../models/Tokens';
import type User from '../database/model/User';

const tokenConfig: TokenConfig = getConfig().tokenConfig;

export const getAccessToken = (authorization?: string) => {
  if (!authorization) {
    throw new AuthFailureError('Invalid Authorization');
  }
  if (!authorization.startsWith('Bearer ')) {
    throw new AuthFailureError('Invalid Authorization');
  }
  return authorization.split(' ')[1];
};

export const validateTokenData = (payload: JwtPayload): boolean => {
  if (
    !payload ||
    !payload.iss ||
    !payload.sub ||
    !payload.aud ||
    !payload.prm ||
    payload.iss !== tokenConfig.issuer ||
    payload.aud !== tokenConfig.audience ||
    !Types.ObjectId.isValid(payload.sub)
  ) {
    throw new AuthFailureError('Invalid Access Token');
  }
  return true;
};

export const createTokens = async (
  user: User,
  accessTokenKey: string,
  refreshTokenKey: string,
): Promise<Tokens> => {
  const accessToken = await JWT.encode(
    new JwtPayload(
      tokenConfig.issuer,
      tokenConfig.audience,
      user._id.toString(),
      accessTokenKey,
      tokenConfig.accessTokenValidityDays,
    ),
  );

  if (!accessToken) {
    throw new InternalError();
  }

  const refreshToken = await JWT.encode(
    new JwtPayload(
      tokenConfig.issuer,
      tokenConfig.audience,
      user._id.toString(),
      refreshTokenKey,
      tokenConfig.refreshTokenValidityDays,
    ),
  );

  if (!refreshToken) {
    throw new InternalError();
  }

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  } as Tokens;
};
