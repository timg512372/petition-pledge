const jwt = require('jsonwebtoken');
const ImageKit = require('imagekit');
const User = require('../models/User');
require('dotenv').config();

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findOne({ _id: decoded._id, tokens: { $elemMatch: { token } } });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        return res.status(400).send('Not Authenticated');
    }
};

const getImageKit = () => {
    return new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC,
        privateKey: process.env.IMAGEKIT_PRIVATE,
        urlEndpoint: process.env.IMAGEKIT_URL,
    });
};

module.exports = { auth, getImageKit };
