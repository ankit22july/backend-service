import { AuthFailureError } from '../core/ApiError';
import RoleRepo from '../database/repository/RoleRepo';
import asyncHandler from '../helpers/asyncHandler';
import express from 'express';
import type Role from '../database/model/Role';

const router = express.Router();

export default router.use(
  asyncHandler(async (req: any, res, next) => {
    
    if (!req.user || !req.user.roles || !req.currentRoleCode) {
      throw new AuthFailureError('Permission denied');
    }

    const role = await RoleRepo.findByCode(req.currentRoleCode);
    if (!role) {
      throw new AuthFailureError('Permission denied');
    }

    
    const validRoles = req.user.roles.filter(
      (userRole : Role) => userRole._id.toHexString() === role._id.toHexString(),
    );

    if (!validRoles || validRoles.length == 0) {
      throw new AuthFailureError('Permission denied');
    }

    return next();
  }),
);
