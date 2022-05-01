import { SuccessMsgResponse } from '../../../core/ApiResponse';
import KeystoreRepo from '../../../database/repository/KeystoreRepo';
import asyncHandler from '../../../helpers/asyncHandler';
import authentication from '../../../auth/authentication';
import express from 'express';

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication);
/*-------------------------------------------------------------------------*/

router.delete(
  '/',
  asyncHandler(async (req: any, res) => {
    await KeystoreRepo.remove(req.keystore._id);
    new SuccessMsgResponse('Logout success').send(res);
  }),
);

export default router;
