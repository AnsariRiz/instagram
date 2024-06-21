const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @desc Register a user
// @route POST /api/users/register
// @param {String}
// @access public

const registerUser = asyncHandler(async (req, res) => {
    const {mobile, email, fullname, username, password} = req.body;

    if(!mobile || !email || !fullname || !username || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
        res.status(400);
        if (userExists.email === email) {
            throw new Error('Email already exists');
        } else {
            throw new Error('Username already exists');
        }
    }

    if (username.length < 4) {
        res.status(400);
        throw new Error('Username must be at least 4 characters long');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        fullname,
        email,
        username,
        password: hashedPassword,
    });

    if(user){
        res.status(201).json({
            message: 'User created successfully',
            _id: user.id,
            username: user.username,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('User data not valid');
    }

});

module.exports = { registerUser };