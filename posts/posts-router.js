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



module.exports = router;