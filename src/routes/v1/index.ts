import apikey from '../../auth/apikey';
import express from 'express';
import login from './access/login';
import logout from './access/logout';
import signup from './access/signup';
import token from './access/token';
import admin from './admin/admin'
import user from './profile/user';
import question from './question/question';

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are public APIs protected by api-key
// router.use('/', apikey);
/*-------------------------------------------------------------------------*/

router.use('/signup', signup);
router.use('/login', login);
router.use('/logout', logout);
router.use('/token', token);
router.use('/user', user);
router.use('/question', question);
router.use('/admin', admin);

export default router;
