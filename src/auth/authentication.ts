import { AccessTokenError, AuthFailureError, TokenExpiredError } from '../core/ApiError';
import { Types } from 'mongoose';
import { getAccessToken, validateTokenData } from './authUtils';
import JWT from '../core/JWT';
import KeystoreRepo from '../database/repository/KeystoreRepo';
import UserRepo from '../database/repository/UserRepo';
import asyncHandler from '../helpers/asyncHandler';
import express from 'express';
import schema from './schema';
import validator, { ValidationSource } from '../helpers/validator';

const router = express.Router();

export default router.use(
  validator(schema.auth, ValidationSource.HEADER),
  asyncHandler(async (req: any, res, next) => {
    req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase

    try {
      const payload = await JWT.validate(req.accessToken);
      validateTokenData(payload);

      const user = await UserRepo.findById(new Types.ObjectId(payload.sub));
      if (!user) {
        throw new AuthFailureError('User not registered');
      }
      req.user = user;

      const keystore = await KeystoreRepo.findforKey(req.user._id, payload.prm);
      if (!keystore) {
        throw new AuthFailureError('Invalid access token');
      }
      req.keystore = keystore;

      return next();
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new AccessTokenError(e.message);
      }
      throw e;
    }
  }),
);
