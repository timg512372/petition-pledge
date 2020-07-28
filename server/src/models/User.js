require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain password');
            }
        },
    },
    bio: {
        type: String,
    },
    pfp: {
        type: String,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error('Not a valid URL');
            }
        },
    },
    friends: {
        type: Array,
        required: true,
    },
    friendRequests: {
        type: Array,
        required: true,
    },
    feed: {
        type: Array,
        required: true,
    },
    activity: {
        type: Array,
        required: true,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to log in');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to log in');
    }

    return user;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET);

    user.tokens.push({ token });
    await user.save();
    return token;
};

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.tokens;
    return user;
};

userSchema.methods.publicProfile = function (requester) {
    const user = this.toJSON();

    delete user.friendRequests;
    delete user.feed;

    if (!requester || !requester.friends.includes(user._id)) {
        delete user.activity;
        delete user.friends;
    }

    return user;
};

userSchema.plugin(mongoose_fuzzy_searching, {
    fields: [
        { name: 'name', weight: 3 },
        { name: 'bio', weight: 1 },
    ],
    middlewares: {
        preSave: async function () {
            const user = this;

            if (user.isModified('password')) {
                user.password = await bcrypt.hash(user.password, 8);
            }
        },
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
