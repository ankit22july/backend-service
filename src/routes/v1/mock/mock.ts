import asyncHandler from "../../../helpers/asyncHandler";
import { mockApiResponses } from "./mockData";
import express from "express";

const router = express.Router();

router.get(
  "/admin/user/list",
  asyncHandler(async (req: any, res) => {
    return res.send(mockApiResponses["/admin/user/list"]);
  })
);

router.put(
  "/admin/user/:id",
  asyncHandler(async (req: any, res) => {
    const response = res.send(mockApiResponses["/admin/user/:id"]);
    return response;
  })
);

/* Add route to delete user for a given id */
router.delete(
  "/admin/user/:id",
  asyncHandler(async (req: any, res) => {
    const response = res.send(mockApiResponses["/admin/user/:id/delete"]);
    return response;
  })
);

// Author related routes
router.post(
  "/author/exam",
  asyncHandler(async (req: any, res) => {
    const response = res.send(mockApiResponses["/author/exam/post"]);
    return response;
  })
);

/* Add route to get all the exams created by input author */
router.get(
  "/author/exam",
  asyncHandler(async (req: any, res) => {
    const response = res.send(mockApiResponses["/author/exam/get"]);
    return response;
  })
);

// Subject related routes
/* add route to create a new subject in subjectrepo */
router.post(
  "/subject/manage",
  asyncHandler(async (req: any, res) => {
    const response = res.send(mockApiResponses["/subject/manage"]);
    return response;
  })
);

/* add route to get all subjects in subjectrepo */
router.get(
  "/subject/list",
  asyncHandler(async (req: any, res) => {
    const response = res.send(mockApiResponses["/subject/list"]);
    return response;
  })
);

/* Add route to return all questions for a given subject name */
router.get(
  "/subject/:id/questions",
  asyncHandler(async (req: any, res) => {
    const response = res.send(mockApiResponses["/subject/:id/questions"]);
    return response;
  })
);

// User related routes

router.get(
    '/user/public/id/:id',
    asyncHandler(async (req: any, res) => {
        const response = res.send(mockApiResponses["/user/public/id/:id"]);
        return response;
    }),
  );

  
router.get(
  "/user/my",
  asyncHandler(async (req: any, res) => {
    const response = res.send(mockApiResponses["/user/my/get"]);
    return response;
  })
);

router.put(
  "/user",
  asyncHandler(async (req: any, res) => {
    const response = res.send(mockApiResponses["/user/put"]);
    return response;
  })
);

/* add post route which receives question array and create entry for them in QuestionRepo*/
router.post(
    '/question',
    asyncHandler(async (req: any, res) => {
        const response = res.send(mockApiResponses["/question/post"]);
        return response;
    }   
));

export default router;
