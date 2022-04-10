import { JoiObjectId } from '../../../helpers/validator';
import Joi from 'joi';

export default {
  postQuestion: Joi.object().keys({
    statement: Joi.string().required().min(3),
    options: Joi.array().items(Joi.string().required().min(3)),
    answer: Joi.number().required().min(0).max(2),
    subject: Joi.string().required().min(3),
  }),
};
