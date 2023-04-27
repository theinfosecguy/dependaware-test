const posts = [
  { id: 1, title: 'First Post', content: 'This is the content of the first post.' },
  { id: 2, title: 'Second Post', content: 'This is the content of the second post.' },
  { id: 3, title: 'Third Post', content: 'This is the content of the third post.' },
];

exports.getAll = () => {
  return [...posts];
};

exports.getById = (id) => {
  return posts.find((p) => p.id === id);
};

exports.reset = () => {
  posts.splice(0, posts.length, ...[
    { id: 1, title: 'First Post', content: 'This is the content of the first post.' },
    { id: 2, title: 'Second Post', content: 'This is the content of the second post.' },
    { id: 3, title: 'Third Post', content: 'This is the content of the third post.' },
  ]);
};

// Create and save a new post
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.content) {
    res.status(400).send({ message: 'Title and content cannot be empty.' });
    return;
  }

  // Create a post
  const post = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
  };

  // Save the post in the database
  posts.push(post);
  res.status(201).send({ id: post.id });
};

// Retrieve all posts from the database
exports.findAll = (req, res) => {
  res.send(posts);
};

// Retrieve a single post by ID from the database
exports.findById = (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.postId));
  if (!post) {
    res.status(404).send({ message: `Post with ID ${req.params.postId} not found.` });
    return;
  }
  res.send(post);
};

// Update a post by ID in the database
exports.updateById = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.content) {
    res.status(400).send({ message: 'Title and content cannot be empty.' });
    return;
  }

  // Find the post by ID
  const post = posts.find((p) => p.id === parseInt(req.params.postId));
  if (!post) {
    res.status(404).send({ message: `Post with ID ${req.params.postId} not found.` });
    return;
  }

  // Update the post
  post.title = req.body.title;
  post.content = req.body.content;

  res.send({ message: 'Post updated.' });
};

// Delete a post by ID from the database
exports.deleteById = (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.postId));
  if (index === -1) {
    res.status(404).send({ message: `Post with ID ${req.params.postId} not found.` });
    return;
  }

  posts.splice(index, 1);
  res.send({ message: 'Post deleted.' });
};