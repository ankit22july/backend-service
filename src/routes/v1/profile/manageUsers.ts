import { BadRequestError } from '../../../core/ApiError';
import { RoleCode } from '../../../database/model/Role';
import { SuccessResponse } from '../../../core/ApiResponse';
import UserRepo from '../../../database/repository/UserRepo';
import _ from 'lodash';
import asyncHandler from '../../../helpers/asyncHandler';
import authentication from '../../../auth/authentication';
import authorization from '../../../auth/authorization';
import express from 'express';
import role from '../../../helpers/role';

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication, role(RoleCode.AUTHOR), authorization);
/*-------------------------------------------------------------------------*/

router.get(
  '/user/list',
  asyncHandler(async (req: any, res) => {
    const pageNum = req.query.page || 0;
    const users = await UserRepo.retrieveUsersByPage(pageNum, 10);
    return new SuccessResponse(
      'success',
      _.map(users, _.partialRight(_.pick, ['_id', 'name', 'roles'])),
    ).send(res);
  }),
);

router.put(
  '/user/:id',
  asyncHandler(async (req: any, res) => {
    const user = await UserRepo.findProfileById(req.params.id);
    if (!user) {
      throw new BadRequestError('User not registered');
    }

    if (req.body.roles) {
      user.roles = req.body.roles.split(',');
    }

    await UserRepo.updateInfo(user);
    return new SuccessResponse(
      'Profile updated',
      _.pick(user, ['name', 'profilePicUrl', 'roles']),
    ).send(res);
  }),
);

router.delete(
  '/user/:id',
  asyncHandler(async (req: any, res) => {
    const user = await UserRepo.remove(req.params.id);
    if (!user) {
      throw new BadRequestError('User not found');
    }

    if (req.body.roles) {
      user.roles = req.body.roles.split(',');
    }

    await UserRepo.updateInfo(user);
    return new SuccessResponse(
      'Profile updated',
      _.pick(user, ['name', 'profilePicUrl', 'roles']),
    ).send(res);
  }),
);

export default router;
