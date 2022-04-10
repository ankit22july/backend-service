import type { NextFunction, Request, Response } from 'express';
import type { ProtectedRequest } from '../models/CustomRequest';

type AsyncFunction = (
  req: Request | ProtectedRequest,
  res: Response,
  next: NextFunction,
) => Promise<any>;

export default (execution: AsyncFunction) =>
  (req: Request | ProtectedRequest, res: Response, next: NextFunction) => {
    execution(req, res, next).catch(next);
  };
