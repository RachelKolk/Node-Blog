const express = require('express');

const UserData = require('../data/helpers/userDb.js');

const router = express.Router();



function upperCase() {
    return function(req, res, next) {
    req.body.name = req.body.name.toUpperCase();

    next();
}
}


// GETS/READS all of the users
router.get('/', async (req, res) => {
    try {
        const users = await UserData.get(req.query);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: 'Error retrieving users'});
    }  
});


// GETS/READS all of the users by ID
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


// GETS/READS all of the posts made by a particular user 
router.get('/:id/posts', async (req, res) => {
    try {
        const posts = await UserData.getUserPosts(req.params.id);
        if (posts) {
            res.status(200).json(posts)
        } else {
            res.status(404).json({message: "Posts by that user can not be found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "User can not be found"});
    }
});


// CREATES a new user
router.post('/', upperCase(), async (req, res) => {
    if (req.body.name == "") {
        res.status(400).json({errorMessage: "Please provide a username"});
    }
    try {
       const user = await UserData.insert(req.body);
       res.status(201).json(user)
    } catch {
        console.log(error);
        res.status(500).json({message: "Error adding user"});
    }
});


//UPDATES a user
router.put('/:id', upperCase(), async (req, res) => {
    if (req.body.name == "") {
        res.status(400).json({errorMessage: "Please provide a username change"});
    }
        try {
        const user = await UserData.update(req.params.id, req.body);
        if (user == 0) {
            res.status(404).json({message: "That user can not be found"});
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "The user could not be updated"});
    }

});


//DELETES a user
router.delete('/:id', async (req, res) => {
    try {
        const deleteCount = await UserData.remove(req.params.id);
        if (deleteCount > 0) {
            res.status(200).json({message: "This user has been deleted"});
        } else {
            res.status(404).json({message: "The user could not be found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An error occurred while deleting the user."});
    }
});



module.exports = router;