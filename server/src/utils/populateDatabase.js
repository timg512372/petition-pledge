require('dotenv').config();
const mongoose = require('mongoose');
const faker = require('faker');

const User = require('../models/User');
const Petition = require('../models/Petition');

// mongoose.connect(process.env.MONGOOSE, { useNewUrlParser: true, useUnifiedTopology: true });

let users = [];
let petitions = [];

num = 10;

for (let i = 0; i < num; i++) {
    let user = {
        name: 'FAKE ' + faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        pfp: faker.internet.avatar(),
        friends: [],
        friendRequests: [],
        feed: [],
        activity: [],
        bio: faker.name.title(),
    };
    users.push(user);

    let petition = {
        signers: [],
        tags: [],
        name: 'FAKE ' + faker.company.catchPhrase(),
        description:
            faker.commerce.productDescription() +
            ' ' +
            faker.hacker.phrase() +
            ' ' +
            faker.finance.transactionDescription(),
        url: faker.internet.url() + `/${i}`,
        picture: faker.image.abstract(),
        goal: faker.random.number(),
    };

    petitions.push(petition);
}

console.log(petitions);
