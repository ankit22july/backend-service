import { ForbiddenError } from '../core/ApiError';
import ApiKeyRepo from '../database/repository/ApiKeyRepo';
import Logger from '../core/Logger';
import asyncHandler from '../helpers/asyncHandler';
import express from 'express';
import schema from './schema';
import validator, { ValidationSource } from '../helpers/validator';

const router = express.Router();

export default router.use(
  validator(schema.apiKey, ValidationSource.HEADER),
  asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // @ts-ignore
    req.apiKey = req.headers['x-api-key'].toString();
    // @ts-ignore
    const apiKey = await ApiKeyRepo.findByKey(req.apiKey);
    Logger.info(apiKey);

    if (!apiKey) {
      throw new ForbiddenError();
    }
    return next();
  }),
);
