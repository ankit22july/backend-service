import { AuthFailureError } from '../core/ApiError';
import RoleRepo from '../database/repository/RoleRepo';
import asyncHandler from '../helpers/asyncHandler';
import express from 'express';

const router = express.Router();

export default router.use(
  asyncHandler(async (req: express.Request, res, next) => {
    // @ts-ignore
    if (!req.user || !req.user.roles || !req.currentRoleCode) {
      throw new AuthFailureError('Permission denied');
    }

    // @ts-ignore
    const role = await RoleRepo.findByCode(req.currentRoleCode);
    if (!role) {
      throw new AuthFailureError('Permission denied');
    }

    // @ts-ignore
    const validRoles = req.user.roles.filter(
      // @ts-ignore
      (userRole) => userRole._id.toHexString() === role._id.toHexString(),
    );

    if (!validRoles || validRoles.length == 0) {
      throw new AuthFailureError('Permission denied');
    }

    return next();
  }),
);
