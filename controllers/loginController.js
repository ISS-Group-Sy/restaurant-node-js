const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const Token = require('../models/token');

const createTokens = (id) => {
    const accessToken = jwt.sign( { id }, process.env.secret, {
        expiresIn: '5m'
    });

    const refreshToken = jwt.sign( { id }, process.env.secret, {});
    return {accessToken, refreshToken};
};

module.exports.login_post = async (req, res, next) => {
    try {
        const { email, password } = req.body;
    
        if (!email || !password) {
            throw new Error('please Enter your email and password');
        }

        const foundUser = await User.findOne( { email });
        if (!foundUser) {
            throw new Error('Invalid email or password');
        }
        
        const validPassword = await bcryptjs.compare(password, foundUser.hashPassword);
        if (!validPassword) {
            throw new Error('Invalid email or password');
        }

        const existingToken = await Token.findOne({ userId: foundUser._id });
        if (existingToken) {
            await Token.findOneAndDelete( { userId: foundUser._id });
        }
        const { accessToken, refreshToken } = createTokens(foundUser._id);

        // edit refresh token in database 
        const newToken = new Token({
            userId: foundUser._id,
            refreshToken,
        });
        await newToken.save();

        res.status(201).json( {message: 'Successful login', refreshToken, accessToken});
    }
    catch(err) {
        nexr(err);
    }
};