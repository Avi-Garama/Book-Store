import express from 'express';
import * as userController from '../controllers/users.controller.js';
import userAuth from '../middlewares/user.auth.js';

const router = new express.Router();

router.get('/users', userController.getUsers);

router.post('/users/signup', userController.CreateNewUser);

router.post('/users/login', userController.login);

router.post('/users/logout', userAuth, userController.logout);


export default router;