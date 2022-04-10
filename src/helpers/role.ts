import type { NextFunction, Request, Response } from 'express';
import type { RoleCode } from '../database/model/Role';

export default (roleCode: RoleCode) => (req: Request, res: Response, next: NextFunction) => {
  // @ts-expect-error
  req.currentRoleCode = roleCode;
  next();
};
