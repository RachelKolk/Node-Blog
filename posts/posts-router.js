const express = require('express');

const PostData = require('../data/helpers/postDb.js');

const router = express.Router();


// GETS/READS all of the posts 
router.get('/', async (req, res) => {
    try {
        const posts = await PostData.get(req.query);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500)({error: "The posts could not be retrieved."});
    }
});


// GETS/READS the post by the ID of the post (not the ID of the user)
router.get('/:id', async (req, res) => {
    try {
        const posts = await PostData.getById(req.params.id);

        if (posts) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({message: "Posts by that ID not found."})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error retrieving post"});
    }
});


// CREATES a new post
router.post('/', async (req, res) => {
    try {
        const post = await PostData.insert(req.body);
        res.status(201).json(post);
    } catch {
        console.log(error);
        res.status(500).json({message: "Error adding post"});
    }
});


// UPDATES a post by that post's ID (not by the user's ID)
router.put('/:id', async (req, res) => {
    if (req.body.user_id == null || req.body.text == null) {
        res.status(400).json({errorMessage: "Please provide a user ID and text"});
    }
    try {
        const post = await PostData.update(req.params.id, req.body);
        if (post == 0) {
            res.status(404).json({message: "The post with that ID cannot be found."});
        } else {
            res.status(200).json(req.body);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "The post could not be modified"});
    } 
});


// DELETES a post - uses the post ID to do so 
router.delete('/:id', async (req, res) => {
    try {
        const deleteCount = await PostData.remove(req.params.id);
        if (deleteCount > 0) {
            res.status(200).json({message: "The post has been deleted"});
        } else {
            res.status(404).json({message: "That post could not be found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "There was an error while deleting th post"});
    }
});



module.exports = router;