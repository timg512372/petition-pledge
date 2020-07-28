const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Petition = require('../models/Petition');
const { auth, getImageKit } = require('../utils/authMiddleware');
const User = require('../models/User');
const Tag = require('../models/Tag');

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

router.get('/', async (req, res) => {
    const { id, query, tags } = req.query;

    let petitions = [];

    try {
        if (id) {
            petitions[0] = await Petition.findById(id);
        } else if (query) {
            petitions = await Petition.fuzzySearch(query);
        } else if (tags) {
            petitions = await Petition.find({ tags });
        } else {
            petitions = await Petition.find();
        }
    } catch (e) {
        console.log(e.message);
        return res.status(500).send(e.message);
    }

    return res.status(200).json({
        success: true,
        petitions,
    });
});

router.post('/newPetition', upload.any('fileData'), auth, async (req, res) => {
    const { name, description, url, goal, tags } = req.body;

    if (!name) {
        return res.status(400).json({
            name: 'Name not found',
        });
    } else if (!description) {
        return res.status(400).json({
            description: 'Description not found',
        });
    } else if (!url) {
        return res.status(400).json({
            url: 'Petition url not found',
        });
    } else if (!goal) {
        return res.status(400).json({
            goal: 'Petition goal not found',
        });
    }

    try {
        const imageKit = getImageKit();
        const result = await imageKit.upload({
            file: fs.readFileSync(req.files[0].path),
            fileName:
                req.body.name != 'undefined' ? req.body.name : `${req.user._id}-${Date.now()}`,
        });

        let date = new Date();
        let newPetition = new Petition({
            name,
            description,
            url,
            goal,
            signers: [],
            creator: req.user._id,
            date: date.toISOString(),
            tags: tags ? tags : [],
            picture: result.url,
        });
        await newPetition.save();

        if (tags) {
            let promises = tags.map(async (name) => {
                let tag = await Tag.findOne({ name });
                tag.usage = tag.usage + 1;
                await tag.save();
            });

            await Promise.all(promises);
        }

        let promises = await req.user.friends.map(async (uid) => {
            let user = await User.findById(uid);
            if (!user) {
                return;
            }

            user.feed.push({
                type: 'CREATE_PETITION',
                user: req.user._id,
                petition: newPetition._id,
                date: date.toISOString(),
            });
            await user.save();
        });

        let responses = await Promise.all(promises);

        req.user.activity.push({
            type: 'CREATE_PETITION',
            user: req.user._id,
            petition: newPetition._id,
            date: date.toISOString(),
        });
        await req.user.save();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e.message);
    }

    return res.status(200).json({
        success: 'true',
    });
});

router.post('/editPetition', auth, async (req, res) => {
    const { id, name, description, url } = req.body;

    if (!id) {
        return res.status(400).json({
            id: 'Petition ID not found',
        });
    }

    try {
        let petition = await Petition.findById(id);
        if (!petition) {
            return res.status(400).json({
                id: 'No Petition Found',
            });
        } else if (req.user._id != petition.creator) {
            return res.status(400).json({
                id: 'Only petition creator can modify petition',
            });
        }

        petition.name = name ? name : petition.name;
        petition.description = description ? description : petition.description;
        petition.url = url ? url : petition.url;
        await petition.save();
    } catch (e) {
        console.log(e.message);
        return res.status(500).send(e.message);
    }

    return res.status(200).json({
        success: true,
    });
});

router.post('/signPetition', auth, async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({
            id: 'Petition ID not found',
        });
    }

    try {
        let petition = await Petition.findById(id);
        if (!petition) {
            return res.status(400).json({
                id: 'No Petition Found',
            });
        } else if (petition.signers.includes(req.user._id)) {
            return res.status(400).json({
                id: 'Petition already signed',
            });
        }

        petition.signers.push(req.user._id);

        await petition.save();

        let date = new Date();

        let promises = await req.user.friends.map(async (uid) => {
            let user = await User.findById(uid);
            if (!user) {
                return;
            }

            user.feed.push({
                type: 'SIGN_PETITION',
                user: req.user._id,
                petition: id,
                date: date.toISOString(),
            });
            await user.save();
        });

        let responses = await Promise.all(promises);

        req.user.activity.push({
            type: 'SIGN_PETITION',
            user: req.user._id,
            petition: id,
            date: date.toISOString(),
        });
        await req.user.save();
    } catch (e) {
        console.log(e.message);
        return res.status(500).send(e.message);
    }

    return res.status(200).json({
        success: 'true',
    });
});

module.exports = router;
