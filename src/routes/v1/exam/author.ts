import express from 'express';
import { SuccessResponse, SuccessMsgResponse } from '../../../core/ApiResponse';
import { BadRequestError, ForbiddenError } from '../../../core/ApiError';
import SubjectRepo from '../../../database/repository/SubjectRepo';
import ExamRepo from '../../../database/repository/ExamRepo';
import type Exam from '../../../database/model/Exam';
import type Question from '../../../database/model/Question';
import { RoleCode } from '../../../database/model/Role';
import { Types } from 'mongoose';
import asyncHandler from '../../../helpers/asyncHandler';
import authentication from '../../../auth/authentication';
import authorization from '../../../auth/authorization';
import role from '../../../helpers/role';
import type Subject from '../../../database/model/Subject';

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for writer's role
router.use('/', authentication, role(RoleCode.AUTHOR), authorization);
/*-------------------------------------------------------------------------*/

/* Add route to create new exam in examrepo */
router.post(
    '/',
    asyncHandler(async (req: any, res) => {
        const subject = await SubjectRepo.findByName(req.body.subjectName) as Subject;
        if(!subject) {
            throw new BadRequestError('Subject not found');
        }
        const exam: any = {
            subject,
            title: req.body.title,
            description: req.body.description,
            author: req.user,
            tags: req.body.tags,
            maxScore: req.body.maxScore,
            questions: [],
            isSubmitted: false,
            isDraft: true,
            isPublished: false,
            createdBy: req.user,
            updatedBy: req.user,
        }
        const result = await ExamRepo.create(exam);
        new SuccessMsgResponse(`${result.title} Exam added successfully`).send(res);
    }
));

/* Add route to get all the exams created by input author */
router.get(
    '/',
    asyncHandler(async (req: any, res) => {
        const exams = await ExamRepo.findAllPublishedForAuthor(req.user);
        console.log(exams);
        new SuccessResponse("Exams fetched successfully",exams).send(res);
    }
));


export default router;