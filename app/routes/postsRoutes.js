const express = require('express');
const router = express.Router();
const postController = require('../controllers/postsController');

// Create a new post
router.post('/', postController.create);

// Retrieve all posts
router.get('/', postController.findAll);

// Retrieve a single post by ID
router.get('/:postId', postController.findById);

// Update a post by ID
router.put('/:postId', postController.updateById);

// Delete a post by ID
router.delete('/:postId', postController.deleteById);

module.exports = router;
