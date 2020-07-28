const express = require('express');
const User = require('../models/User');
const { auth, getImageKit } = require('../utils/authMiddleware');

const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).send('Petition Pledge Authentication Router');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({
            email: 'Email not found',
        });
    } else if (!password) {
        return res.status(400).json({
            password: 'Password not found',
        });
    }

    let user;
    let token = {};

    try {
        user = await User.findByCredentials(email, password);
        token = await user.generateAuthToken();
    } catch (e) {
        console.log(e);
        return res.status(400).send(e.message);
    }

    return res.status(200).send({
        success: true,
        user,
        token,
    });
});

router.post('/register', async (req, res) => {
    const { name, email, password, cpassword } = req.body;

    if (!name) {
        return res.status(400).json({
            name: 'Name not found',
        });
    } else if (!email) {
        return res.status(400).json({
            email: 'Email not found',
        });
    } else if (!password) {
        return res.status(400).json({
            password: 'Password not found',
        });
    } else if (!cpassword) {
        return res.status(400).json({
            cpassword: 'Password confirmation not found',
        });
    } else if (cpassword !== password) {
        return res.status(400).json({
            password: "Passwords don't match",
        });
    }

    let user = {};
    let token = {};

    try {
        await User.init();
        user = new User({ name, email, password, friends: [], friendRequests: [], activity: [] });
        await user.save();
        token = await user.generateAuthToken();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e.message);
    }

    return res.status(200).json({
        success: true,
        token,
        user,
    });
});

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
        await req.user.save();
    } catch (e) {
        console.log(e);
        return res.status(400).send(e.message);
    }

    return res.status(200).json({ success: true });
});

router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
    } catch (e) {
        console.log(e);
        return res.status(400).send(e.message);
    }

    return res.status(200).json({ success: true });
});

router.get('/imageKit', (req, res) => {
    try {
        const imagekit = getImageKit();
        const authenticationParameters = imagekit.getAuthenticationParameters();
        return res.status(200).json(authenticationParameters);
    } catch (e) {
        console.log(e);
        return res.status(400).send(e.message);
    }
});

module.exports = router;
