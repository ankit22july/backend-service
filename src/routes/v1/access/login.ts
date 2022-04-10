import { AuthFailureError, BadRequestError } from '../../../core/ApiError';
import { SuccessResponse } from '../../../core/ApiResponse';
import { createTokens } from '../../../auth/authUtils';
import KeystoreRepo from '../../../database/repository/KeystoreRepo';
import UserRepo from '../../../database/repository/UserRepo';
import _ from 'lodash';
import asyncHandler from '../../../helpers/asyncHandler';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import express from 'express';
import schema from './schema';
import validator from '../../../helpers/validator';

const router = express.Router();

export default router.post(
  '/basic',
  validator(schema.userCredential),
  asyncHandler(async (req, res) => {
    const user = await UserRepo.findByEmail(req.body.email);
    if (!user) {
      throw new BadRequestError('User not registered');
    }
    if (!user.password) {
      throw new BadRequestError('Credential not set');
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      throw new AuthFailureError('Authentication failure');
    }

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');

    await KeystoreRepo.create(user._id, accessTokenKey, refreshTokenKey);
    const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);

    new SuccessResponse('Login Success', {
      user: _.pick(user, ['_id', 'name', 'roles', 'profilePicUrl']),
      tokens: tokens,
    }).send(res);
  }),
);
