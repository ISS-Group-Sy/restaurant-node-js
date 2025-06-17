const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Token = require('../models/token');

const createTokens = (id) => {
    const accessToken = jwt.sign( { id }, process.env.secret, {
        expiresIn: '5m'
    });

    const refreshToken = jwt.sign( { id }, process.env.secret, {});
    return {accessToken, refreshToken};
};

module.exports.register_post = async (req, res, next) => {
    try {
        const { name, password, confirmPassword, email} = req.body;

        if (password != confirmPassword) {
            return res.status(400).json({ message: 'Password and confirm password do not match' });
        }

        const newUser = await User.create({ name, hashPassword: password, email});
        await newUser.save();

        const { accessToken, refreshToken} = createTokens(newUser._id);
        const token = new Token({
            userId: newUser._id,
            refreshToken,
        });
        token.save();

        res.status(201).json( {message: 'Successful registration', refreshToken, accessToken});
    }
    catch(err) {
        next(err);
    }
}
