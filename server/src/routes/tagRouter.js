const express = require('express');
const Tag = require('../models/Tag');
const { auth } = require('../utils/authMiddleware');

const router = express.Router();

router.get('/', async (req, res) => {
    const { query } = req.query;

    let tags = [];
    try {
        console.log(query);
        if (query) {
            tags = await Tag.fuzzySearch(query);
        } else {
            tags = await Tag.find().sort({ usage: 'descending' });
        }
    } catch (e) {
        console.log(e.message);
        return res.status(500).send(e.message);
    }

    return res.status(200).json({
        success: true,
        tags,
    });
});

router.post('/newTag', auth, async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(200).json({
            name: 'Name not found',
        });
    }

    try {
        let newTag = new Tag({ name, usage: 0 });
        await newTag.save();
    } catch (e) {
        console.log(e.message);
        return res.status(500).send(e.message);
    }

    return res.status(200).json({
        success: true,
    });
});

module.exports = router;
