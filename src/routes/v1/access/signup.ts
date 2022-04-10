import { BadRequestError } from '../../../core/ApiError';
import { RoleCode } from '../../../database/model/Role';
import { SuccessResponse } from '../../../core/ApiResponse';
import { createTokens } from '../../../auth/authUtils';
import UserRepo from '../../../database/repository/UserRepo';
import _ from 'lodash';
import asyncHandler from '../../../helpers/asyncHandler';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import express from 'express';
import schema from './schema';
import validator from '../../../helpers/validator';
import type User from '../../../database/model/User';

const router = express.Router();

router.post(
  '/basic',
  validator(schema.signup),
  asyncHandler(async (req: express.Request, res) => {
    const user = await UserRepo.findByEmail(req.body.email);
    if (user) {
      throw new BadRequestError('User already registered');
    }

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    console.log(req.body);

    const { user: createdUser, keystore } = await UserRepo.create(
      {
        name: req.body.name,
        email: req.body.email,
        profilePicUrl: req.body.profilePicUrl,
        password: passwordHash,
      } as User,
      accessTokenKey,
      refreshTokenKey,
      RoleCode.STUDENT,
    );

    const tokens = await createTokens(createdUser, keystore.primaryKey, keystore.secondaryKey);
    new SuccessResponse('Signup Successful', {
      user: _.pick(createdUser, ['_id', 'name', 'email', 'roles', 'profilePicUrl']),
      tokens: tokens,
    }).send(res);
  }),
);

export default router;
