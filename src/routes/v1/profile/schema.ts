import { JoiObjectId } from '../../../helpers/validator';
import Joi from 'joi';

export default {
  userId: Joi.object().keys({
    id: JoiObjectId().required(),
  }),
  profile: Joi.object().keys({
    name: Joi.string().optional().min(1).max(200),
    role: Joi.string().optional().uri(),
  }),
};
