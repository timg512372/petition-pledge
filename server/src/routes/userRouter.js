const express = require('express');
const User = require('../models/User');
const { auth } = require('../utils/authMiddleware');

const router = express.Router();

router.get('/feed', auth, async (req, res) => {
    let feed = [];
    try {
        feed = req.user.feed;
    } catch (e) {
        console.log(e);
        return res.status(200).send(e.message);
    }

    return res.status(200).json({
        success: true,
        feed,
    });
});

router.get('/friends', auth, async (req, res) => {
    let friends = [];
    try {
        friends = req.user.friends;
    } catch (e) {
        console.log(e);
        return res.status(200).send(e.message);
    }
    return res.status(200).json({
        success: true,
        friends,
    });
});

router.get('/friendRequests', auth, async (req, res) => {
    let friendRequests = [];
    try {
        friendRequests = req.user.friendRequests;
    } catch (e) {
        console.log(e);
        return res.status(200).send(e.message);
    }
    return res.status(200).json({
        success: true,
        friendRequests,
    });
});

router.post('/addFriendRequest', auth, async (req, res) => {
    const { uid } = req.body;

    if (!uid) {
        return res.status(400).json({
            uid: 'No user ID found',
        });
    } else if (req.user.friends.includes(uid)) {
        return res.status(400).json({
            uid: 'Already friends',
        });
    }

    try {
        let user = await User.findById(uid);
        user.friendRequests.addToSet(req.user._id.toString());
        await user.save();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e.message);
    }

    return res.status(200).send({
        success: true,
    });
});

router.post('/addFriend', auth, async (req, res) => {
    const { uid } = req.body;

    if (!uid) {
        return res.status(400).json({
            uid: 'No user ID found',
        });
    }

    try {
        if (!req.user.friendRequests.includes(uid)) {
            return res.status(400).json({ uid: 'User not in your friend requests' });
        }

        let user = await User.findById(uid);
        user.friends.addToSet(req.user._id.toString());
        await user.save();

        req.user.friends.addToSet(uid);
        req.user.friendRequests.remove(uid);
        await req.user.save();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e.message);
    }

    return res.status(200).send({
        success: true,
    });
});

module.exports = router;
