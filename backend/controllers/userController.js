import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';

// @desc    Auth User & Get Token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(user && (await user.matchPassword(password))){
        const token = generateToken(user._id);
        res.cookie('token', token, { httpOnly: true, maxAge: 15 * 24 * 60 * 60 * 1000});
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token
        })
    }else{
        res.status(401);
        throw new Error('Invalid Email or Password');
    }
});

// @desc    Register New User
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    
    if(userExists){
        res.status(400);
        throw new Error('User Already Exists');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if(user){
        const token = generateToken(user._id);
        res.cookie('token', token, { httpOnly: true, maxAge: 15 * 24 * 60 * 60 * 1000});
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token
        })
    }else{
        res.status(400);
        throw new Error('Invalid User Data');
    }
    
    
});

// @desc    Get User Profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }else{
        res.status(404);
        throw new Error('User Not Found');
    }
});

const logOutUser = (req, res) => {
    res.cookie('token', '', {httpOnly: true, maxAge: 0});
    res.send('Success');
};

const getCredentials = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if(token && jwt.verify(token, process.env.JWT_SECRET)){
        const user = await User.findById(req.user._id);
        if(user){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token
            });
        }else{
            res.status(404);
            throw new Error('User Not Found');
        }
    }else{
        res.status(401);
        throw new Error('Not Logged in');
    }

});



const getJwt = (req, res) => {
    const token = req.cookies.token;
    if(token && jwt.verify(token, process.env.JWT_SECRET)){
        res.json({token});
    }else{
        res.status(401);
        throw new Error('Please Log in again');
    }
}

export { authUser, getJwt, getUserProfile, registerUser, getCredentials, logOutUser };