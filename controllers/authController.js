const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { validateUser, validateDate  } = require('../services/validationService')

// @desc Register a user
// @route POST /api/users/register
// @param {String}
// @access public

const registerUser = asyncHandler(async (req, res) => {

    const { username, fullname, email, password, mobile } = req.body;
    console.log(username);
    const { error } = validateUser(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.details[0].message);
    }

    const userExists = await User.findOne({ $or: [{ email:req.body.email }, { username:req.body.username }] });
    
    if (userExists) {
        res.status(400);
        if (userExists.email === email) {
            throw new Error('Email already exists');
        } else {
            throw new Error('Username already exists');
        }
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        fullname,
        email,
        username,
        password: hashedPassword,
        mobile
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