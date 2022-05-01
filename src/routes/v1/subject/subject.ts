import express from 'express';
import { SuccessResponse } from '../../../core/ApiResponse';
import SubjectRepo from '../../../database/repository/SubjectRepo';
import QuestionRepo from '../../../database/repository/QuestionRepo';
import type Subject from '../../../database/model/Subject';
import { RoleCode } from '../../../database/model/Role';
import validator from '../../../helpers/validator';
import schema from './schema';
import { Types } from 'mongoose';
import asyncHandler from '../../../helpers/asyncHandler';
import authentication from '../../../auth/authentication';
import authorization from '../../../auth/authorization';
import role from '../../../helpers/role';
import _ from 'lodash';
import { BadRequestError } from '../../../core/ApiError';

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for writer's role
// router.use('/', authentication, role(RoleCode.AUTHOR), authorization);
/*-------------------------------------------------------------------------*/

/* add route to create a new subject in subjectrepo */
router.post(
    '/manage',
    validator(schema.createSubject),
    asyncHandler(async (req: any, res) => {    
    const subject = await SubjectRepo.findByName(req.body.name);
    if (subject) {
      throw new BadRequestError('Subject already Exists');
    }
        const newSubject = req.body as Subject;
        const result = await SubjectRepo.addSubject(newSubject);
        return new SuccessResponse('success', _.pick(result, ['name'])).send(res);
    }
));

/* add route to get all subjects in subjectrepo */
router.get(
    '/list',
    asyncHandler(async (req: any, res) => {
        const subjects = await SubjectRepo.findAll();
        return new SuccessResponse('success', subjects).send(res);
    }
));

/* Add route to return all questions for a given subject name */
router.get(
    '/:id/questions',
    validator(schema.getQuestions),
    asyncHandler(async (req: any, res) => {
      // @ts-ignore
        const result = await QuestionRepo.getQuestionsBySubjectID(new Types.ObjectId(req.params.id), req.body.page, req.body.limit);
        return new SuccessResponse('success', result).send(res);
    }
));

export default router;