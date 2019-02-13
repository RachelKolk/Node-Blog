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

router.get('/:id', async (req, res) => {
    try {
        const user = await UserData.getById(req.params.id);
        if (user.id == req.params.id) {
            res.status(200).json(user)
        } else {
            res.status(404).json({message: "Posts by that user can not be found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "User can not be found"});
    }
});

// router.insert('/', async (req, res) => {
//     try {
        
//     }
// })

module.exports = router;