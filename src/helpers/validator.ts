import { BadRequestError } from '../core/ApiError';
import { Types } from 'mongoose';
import Joi from 'joi';
import Logger from '../core/Logger';
import type { NextFunction, Request, Response } from 'express';

export enum ValidationSource {
  BODY = 'body',
  HEADER = 'headers',
  QUERY = 'query',
  PARAM = 'params',
}

export const JoiObjectId = (): any =>
  Joi.string().custom((value: string, helpers) => {
    if (!Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }, 'Object Id Validation');

export const JoiUrlEndpoint = (): any =>
  Joi.string().custom((value: string, helpers) => {
    if (value.includes('://')) {
      return helpers.error('any.invalid');
    }
    return value;
  }, 'Url Endpoint Validation');

export const JoiAuthBearer = (): any =>
  Joi.string().custom((value: string, helpers) => {
    if (!value.startsWith('Bearer ')) {
      return helpers.error('any.invalid');
    }
    if (!value.split(' ')[1]) {
      return helpers.error('any.invalid');
    }
    return value;
  }, 'Authorization Header Validation');

export default (schema: Joi.ObjectSchema, source: ValidationSource = ValidationSource.BODY) =>
  (req: Request, res: Response, next: NextFunction): any => {
    try {
      const { error } = schema.validate(req[source]);

      if (!error) {
        return next();
      }

      const { details } = error;
      const message = details.map((i) => i.message.replace(/['"]+/g, '')).join(',');
      Logger.error(message);

      next(new BadRequestError(message));
    } catch (error) {
      next(error);
    }
  };
