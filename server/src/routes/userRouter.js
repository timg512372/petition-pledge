const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const validator = require('validator');
const User = require('../models/User');
const Petition = require('../models/Petition');
const { auth, getImageKit } = require('../utils/authMiddleware');
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, path.join(__dirname, '../../uploads/'));
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    },
});

upload = multer({ storage, limits: { fieldSize: 16 * 1024 * 1024 } });

router.get('/', auth, async (req, res) => {
    const { uid, query } = req.query;

    let user = [];
    try {
        if (uid) {
            user = await User.findById(uid);
            user = user.publicProfile(req.user);
        } else if (query) {
            user = await User.fuzzySearch(query);
            user = user.map((element) => element.publicProfile(req.user));
        } else {
            user = req.user;
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send(e.message);
    }

    return res.status(200).send({
        success: true,
        users: user,
    });
});

router.get('/activity', auth, async (req, res) => {
    const { uid } = req.query;

    let activity = [];
    try {
        let structure = req.user.activity;
        if (uid) {
            user = await User.findById(uid);
            user = user.publicProfile(req.user);
            structure = user.activity ? user.activity : [];
        }

        let promises = structure.reverse().map(async (item) => {
            let petition = await Petition.findById(item.petition);

            user = await User.findById(item.user);
            user = user.publicProfile(req.user);

            let activity = {
                date: item.date,
                type: item.type,
                petition,
                user,
            };
            return activity;
        });

        activity = await Promise.all(promises);
    } catch (e) {
        console.log(e);
        return res.status(200).send(e.message);
    }

    return res.status(200).json({
        success: true,
        activity,
    });
});

router.get('/feed', auth, async (req, res) => {
    let feed = [];
    try {
        let promises = req.user.feed.reverse().map(async (item) => {
            let petition = await Petition.findById(item.petition);

            user = await User.findById(item.user);
            user = user.publicProfile(req.user);

            let activity = {
                date: item.date,
                type: item.type,
                petition,
                user,
            };
            return activity;
        });

        feed = await Promise.all(promises);
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
        let promises = req.user.friends.map(async (friend) => {
            let user = await User.findById(friend);
            user = user.publicProfile(req.user);
            return user;
        });

        friends = await Promise.all(promises);
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
        let promises = req.user.friendRequests.map(async (request) => {
            let user = await User.findById(request);
            user = user.publicProfile(req.user);
            return user;
        });

        friendRequests = await Promise.all(promises);
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

router.post('/removeFriendRequest', auth, async (req, res) => {
    const { uid } = req.body;
    if (!uid) {
        return res.status(400).json({
            uid: 'No user ID found',
        });
    }

    try {
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

router.post('/changeProfilePicture', upload.any('fileData'), auth, async (req, res) => {
    if (req.body.type !== 'image') {
        return res.status(400).json({
            type: 'File must be an image',
        });
    }

    try {
        const imageKit = getImageKit();
        const result = await imageKit.upload({
            file: fs.readFileSync(req.files[0].path),
            fileName:
                req.body.name != 'undefined' ? req.body.name : `${req.user._id}-${Date.now()}`,
        });

        req.user.pfp = result.url;
        await req.user.save();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e.message);
    }

    return res.status(200).send({
        success: true,
    });
});

router.post('/setBio', auth, async (req, res) => {
    const { bio } = req.body;

    if (!bio) {
        return res.status(400).json({
            bio: 'No bio found',
        });
    }

    try {
        req.user.bio = bio;
        await req.user.save();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e.message);
    }

    return res.status(200).send({
        success: true,
    });
});

router.post('/sendContacts', auth, async (req, res) => {
    const { contacts } = req.body;

    if (!contacts || !contacts[0]) {
        return res.status(400).json({
            contacts: 'No contact emails found',
        });
    }

    try {
        let sanitizedContacts = [];
        contacts.forEach((element) => {
            if (validator.isEmail(element)) {
                sanitizedContacts.push(element);
            }
        });

        req.user.contacts = sanitizedContacts;
        await req.user.save();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e.message);
    }

    return res.status(200).send({
        success: true,
    });
});

// Implement a path algorithm on this later
router.get('/recommendedUsers', auth, async (req, res) => {
    let recommended = [];
    try {
        if (req.user.contacts) {
            recommended = await User.find({
                email: { $in: req.user.contacts },
                _id: { $nin: [...req.user.friends, ...req.user.friendRequests] },
            });
            recommended = recommended.map((element) => element.publicProfile(req.user));
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send(e.message);
    }

    return res.status(200).send({
        success: true,
        recommended,
    });
});

module.exports = router;
