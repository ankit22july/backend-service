import { BadRequestError } from '../../../core/ApiError';
import { SuccessResponse } from '../../../core/ApiResponse';
import { Types } from 'mongoose';
import UserRepo from '../../../database/repository/UserRepo';
import _ from 'lodash';
import asyncHandler from '../../../helpers/asyncHandler';
import authentication from '../../../auth/authentication';
import express from 'express';
import schema from './schema';
import validator, { ValidationSource } from '../../../helpers/validator';

const router = express.Router();

router.get(
  '/public/id/:id',
  validator(schema.userId, ValidationSource.PARAM),
  asyncHandler(async (req: any, res) => {
    const user = await UserRepo.findPublicProfileById(new Types.ObjectId(req.params.id));
    if (!user) {
      throw new BadRequestError('User not registered');
    }
    return new SuccessResponse('success', _.pick(user, ['name', 'profilePicUrl'])).send(res);
  }),
);

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication);
/*-------------------------------------------------------------------------*/

router.get(
  '/my',
  asyncHandler(async (req: any, res) => {
    const user = await UserRepo.findProfileById(req.user._id);
    if (!user) {
      throw new BadRequestError('User not registered');
    }
    return new SuccessResponse('success', _.pick(user, ['name', 'profilePicUrl', 'roles'])).send(
      res,
    );
  }),
);

router.put(
  '/',
  validator(schema.profile),
  asyncHandler(async (req: any, res) => {
    const user = await UserRepo.findProfileById(req.user._id);
    if (!user) {
      throw new BadRequestError('User not registered');
    }

    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.profilePicUrl) {
      user.profilePicUrl = req.body.profilePicUrl;
    }

    await UserRepo.updateInfo(user);
    return new SuccessResponse(
      'Profile updated',
      _.pick(user, ['name', 'profilePicUrl', 'roles']),
    ).send(res);
  }),
);

export default router;
