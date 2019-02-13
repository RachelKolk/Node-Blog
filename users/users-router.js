const express = require('express');

const UserData = require('../data/helpers/userDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await UserData.get(req.query);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: 'Error retrieving users'});
    }  
});

module.exports = router;