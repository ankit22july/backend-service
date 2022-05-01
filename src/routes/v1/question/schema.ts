import { JoiObjectId } from '../../../helpers/validator';
import Joi from 'joi';

export default {
  postQuestion: Joi.object().keys({
    subjectName: Joi.string().required().min(3),
    questions: Joi.array().items(
      Joi.object().keys({
        statement: Joi.string().required().min(3),
        options: Joi.array().items(Joi.string().optional().min(1)),
        answer: Joi.string().required().min(1),
        isMCQ: Joi.boolean().required(),
      }),
    ).min(1),  // at least one question
  }),
};
