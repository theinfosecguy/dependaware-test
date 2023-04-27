const db = require('../../config/database');

// Create a new post
exports.create = (post, result) => {
  db.run(`INSERT INTO posts (title, content) VALUES (?, ?)`, [post.title, post.content], function(err) {
    if (err) {
      console.error(err.message);
      result(err, null);
      return;
    }
    console.log(`A new post with ID ${this.lastID} has been created.`);
    result(null, this.lastID);
  });
};

// Retrieve all posts
exports.findAll = (result) => {
  db.all(`SELECT * FROM posts`, (err, rows) => {
    if (err) {
      console.error(err.message);
      result(err, null);
      return;
    }
    result(null, rows);
  });
};

// Retrieve a single post by ID
exports.findById = (postId, result) => {
  db.get(`SELECT * FROM posts WHERE id = ?`, [postId], (err, row) => {
    if (err) {
      console.error(err.message);
      result(err, null);
      return;
    }
    if (!row) {
      result({ message: `Post with ID ${postId} not found.` }, null);
      return;
    }
    result(null, row);
  });
};

// Update a post by ID
exports.updateById = (postId, post, result) => {
  db.run(`UPDATE posts SET title = ?, content = ? WHERE id = ?`, [post.title, post.content, postId], (err) => {
    if (err) {
      console.error(err.message);
      result(err, null);
      return;
    }
    console.log(`Post with ID ${postId} has been updated.`);
    result(null, `Post with ID ${postId} has been updated.`);
  });
};

// Delete a post by ID
exports.deleteById = (postId, result) => {
  db.run(`DELETE FROM posts WHERE id = ?`, [postId], (err) => {
    if (err) {
      console.error(err.message);
      result(err, null);
      return;
    }
    console.log(`Post with ID ${postId} has been deleted.`);
    result(null, `Post with ID ${postId} has been deleted.`);
  });
};
