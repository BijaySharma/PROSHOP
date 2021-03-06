import express from 'express';
import protect from '../middleware/authMiddleware.js'
import {
    authUser,
    getCredentials,
    getUserProfile,
    logOutUser,
    registerUser,
    updateUserProfile
} from '../controllers/userController.js';
const router = express.Router();

router.route('/').post(registerUser);

router.route('/login').post(authUser);

router.route('/profile').get(protect, getUserProfile).put(protect,updateUserProfile);

router.route('/credentials').get(protect, getCredentials);

router.route('/logout').post(logOutUser);

export default router;