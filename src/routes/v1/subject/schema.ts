import { JoiObjectId } from '../../../helpers/validator';
import Joi from 'joi';

export default {
  createSubject: Joi.object().keys({
    name: Joi.string().required().min(3),
  }),
  getQuestions: Joi.object().keys({
    page: Joi.number().min(1),
    limit: Joi.number().min(1).max(50),
  }),
};
