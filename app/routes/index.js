const express = require('express');
const router = express.Router();
const postsRoutes = require('./postsRoutes');

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to my Node.js application.' });
});

router.use('/posts', postsRoutes);

module.exports = router;
