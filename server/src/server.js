require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const authRouter = require('./routes/authRouter');
const petitionRouter = require('./routes/petitionRouter');
const userRouter = require('./routes/userRouter');
const tagRouter = require('./routes/tagRouter');

const port = process.env.PORT ? process.env.PORT : 2000;

mongoose.connect(process.env.MONGOOSE, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
    console.log('DB connected successfully!');
});
db.on('error', (err) => {
    console.error(`Error while connecting to DB: ${err.message}`);
});

const app = express();
app.use(bodyParser.json());

app.use('/api/auth/', authRouter);
app.use('/api/petition/', petitionRouter);
app.use('/api/user/', userRouter);
app.use('/api/tag/', tagRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = { app };
