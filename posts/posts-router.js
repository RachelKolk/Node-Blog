const express = require('express');

const PostData = require('../data/helpers/postDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await PostData.get(req.query);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500)({error: "The posts could not be retrieved."});
    }
});

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

router.post('/', async (req, res) => {
    try {
        const post = await PostData.insert(req.body);
        res.status(201).json(post);
    } catch {
        console.log(error);
        res.status(500).json({message: "Error adding post"});
    }
});

// router.update('/')

// router.delete



module.exports = router;