const express = require("express");

// const db = require("../data/dbConfig.js");

const AcctRouter = require('../router/AcctRouter.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', AcctRouter);

server.get('/', (req, res) => {
    res.status(200).json({api: "up"});
});

module.exports = server;
