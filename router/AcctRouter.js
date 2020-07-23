const express = require('express');

const db = require("../data/dbConfig.js");

const router = express.Router();

// /api/accounts

// Get requests

router.get('/', (req, res) => {
    db.select("*")
    .from("accounts")
    .then( accounts => res.status(200).json({data: accounts}))
    .catch((err) => console.log(err));
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    db('accounts')
    .where("id", id)
    .first()
    .then((accounts) => res.status(200).json({data: accounts}))
    .catch((err) => console.log(err));
});

// Create request

router.post('/', (req, res) => {
    const acctData = req.body;
    db('accounts')
    .insert(acctData)
    .then( id => res.status(201).json({data: id}))
    .catch((err) => console.log(err));
});

// Update Request

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    db('accounts')
    .where("id", id)
    .update(changes)
    .then(count => {
        if (count > 0) {
            res.status(200).json({message: "record numbers changed:", count});
        } else {
            res.status(404).json({ message: "That id does not exist, can not update record" });
        }
    })
    .catch((err) => console.log(err));
});

// Delete Request

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db('accounts')
    .where("id", id)
    .delete()
    .then(count => {
        if (count > 0) {
            res.status(200).json({message: "number of Records deleted", count});
        } else {
            res.status(404).json({message: "That is not a valid id. Can not delete"});
        }
    })
    .catch((err) => console.log(err));
});

module.exports = router;