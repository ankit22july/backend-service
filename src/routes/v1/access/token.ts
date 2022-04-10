import { AuthFailureError } from '../../../core/ApiError';
import { TokenRefreshResponse } from '../../../core/ApiResponse';
import { Types } from 'mongoose';
import { createTokens, getAccessToken, validateTokenData } from '../../../auth/authUtils';
import JWT from '../../../core/JWT';
import KeystoreRepo from '../../../database/repository/KeystoreRepo';
import UserRepo from '../../../database/repository/UserRepo';
import asyncHandler from '../../../helpers/asyncHandler';
import crypto from 'crypto';
import express from 'express';
import schema from './schema';
import validator, { ValidationSource } from '../../../helpers/validator';

const router = express.Router();

router.post(
  '/refresh',
  validator(schema.auth, ValidationSource.HEADER),
  validator(schema.refreshToken),
  asyncHandler(async (req: express.Request, res) => {
    // @ts-ignore
    req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase

    // @ts-ignore
    const accessTokenPayload = await JWT.decode(req.accessToken);
    validateTokenData(accessTokenPayload);

    const user = await UserRepo.findById(new Types.ObjectId(accessTokenPayload.sub));
    if (!user) {
      throw new AuthFailureError('User not registered');
    }
    // @ts-ignore
    req.user = user;

    const refreshTokenPayload = await JWT.validate(req.body.refreshToken);
    validateTokenData(refreshTokenPayload);

    if (accessTokenPayload.sub !== refreshTokenPayload.sub) {
      throw new AuthFailureError('Invalid access token');
    }

    const keystore = await KeystoreRepo.find(
      // @ts-ignore
      req.user._id,
      accessTokenPayload.prm,
      refreshTokenPayload.prm,
    );

    if (!keystore) {
      throw new AuthFailureError('Invalid access token');
    }
    await KeystoreRepo.remove(keystore._id);

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');

    // @ts-ignore
    await KeystoreRepo.create(req.user._id, accessTokenKey, refreshTokenKey);
    // @ts-ignore
    const tokens = await createTokens(req.user, accessTokenKey, refreshTokenKey);

    new TokenRefreshResponse('Token Issued', tokens.accessToken, tokens.refreshToken).send(res);
  }),
);

export default router;
