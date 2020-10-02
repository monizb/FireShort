const express = require('express');
const bodyParser = require('body-parser');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({credential: admin.credential.applicationDefault()});

let urlsRouter = require('./routes/urls');
const main = express();
main.use('/v1', urlsRouter);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));
exports.api = functions.https.onRequest(main);
