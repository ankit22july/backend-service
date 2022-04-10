import express from 'express';
import { SuccessResponse, SuccessMsgResponse } from '../../../core/ApiResponse';
import { BadRequestError, ForbiddenError } from '../../../core/ApiError';
import QuestionRepo from '../../../database/repository/QuestionRepo';
import type Question from '../../../database/model/Question';
import { RoleCode } from '../../../database/model/Role';
import { Types } from 'mongoose';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../../helpers/asyncHandler';
import authentication from '../../../auth/authentication';
import authorization from '../../../auth/authorization';
import role from '../../../helpers/role';

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for writer's role
router.use('/', authentication, role(RoleCode.AUTHOR), authorization);
/*-------------------------------------------------------------------------*/

/* add post route which receives question array and create entry for them in QuestionRepo*/
router.post(
    '/',
    validator(schema.postQuestion),
    asyncHandler(async (req: any, res) => {
        const questions = req.body as Question[];
        const result = await QuestionRepo.addQuestions(questions);
        new SuccessMsgResponse('Questions added successfully').send(res);
    }   
));

/***/

export default router;