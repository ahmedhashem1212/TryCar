import express, { Router } from 'express';
const userController = require('../controllers/user.controller');
const router: Router = express.Router();

router.post('/viewUsers', userController.view_users);
router.post('/viewUser', userController.view_users_id);
router.post('/updateUser', userController.update_user);
router.post('/deleteUser', userController.delete_user); 
router.post('/signUp', userController.sign_up);
module.exports = router;
