import express from 'express';
import { SuccessResponse, SuccessMsgResponse } from '../../../core/ApiResponse';
import { BadRequestError, ForbiddenError } from '../../../core/ApiError';
import QuestionRepo from '../../../database/repository/QuestionRepo';
import SubjectRepo from '../../../database/repository/SubjectRepo';
import type Question from '../../../database/model/Question';
import { RoleCode } from '../../../database/model/Role';
import { Types } from 'mongoose';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../../helpers/asyncHandler';
import authentication from '../../../auth/authentication';
import authorization from '../../../auth/authorization';
import role from '../../../helpers/role';
import type Subject from '../../../database/model/Subject';

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for writer's role
// router.use('/', authentication, role(RoleCode.AUTHOR), authorization);
/*-------------------------------------------------------------------------*/

/* add post route which receives question array and create entry for them in QuestionRepo*/
router.post(
    '/',
    validator(schema.postQuestion),
    asyncHandler(async (req: any, res) => {
        const subject = await SubjectRepo.findByName(req.body.subjectName) as Subject;

        if(!subject) {
            throw new BadRequestError('Subject not found');
        }

        const questionList: Question[] = [];
        const now = new Date();
        const createdAt = now;
        const updatedAt = now;
        req.body.questions.forEach(async (question: Question) => {
            // TBD: Add author once authentication is working
            const questionObj = {
                subject,
                createdAt,
                updatedAt,
                statement: question.statement,
                options: question.options,
                answer: question.answer,
                isMCQ: question.isMCQ,
            }; 
            questionList.push(questionObj as Question);
        });

        const result = await QuestionRepo.addQuestions(questionList);
        console.log("result", result);
        new SuccessMsgResponse(`${result.length} Questions added successfully`).send(res);
    }   
));


export default router;