const request = require('supertest');
const express = require('express');
const app = express();
const postsController = require('../app/controllers/postsController');

app.use(express.json());
app.post('/posts', postsController.create);
app.get('/posts', postsController.findAll);
app.get('/posts/:postId', postsController.findById);
app.put('/posts/:postId', postsController.updateById);
app.delete('/posts/:postId', postsController.deleteById);

describe('Posts API', () => {
  afterEach(() => {
    postsController.reset();
  });

  test('GET /posts should return all posts', async () => {
    const res = await request(app).get('/posts');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(postsController.getAll());
  });

  test('POST /posts should create a new post', async () => {
    const newPost = { title: 'New Post', content: 'New post content.' };
    const res = await request(app).post('/posts').send(newPost);
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(postsController.getById(res.body.id)).toEqual({ ...newPost, id: res.body.id });
  });

  test('GET /posts/:postId should return a single post', async () => {
    const postId = 1;
    const res = await request(app).get(`/posts/${postId}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(postsController.getById(postId));
  });

  test('PUT /posts/:postId should update a post', async () => {
    const postId = 1;
    const updatedPost = { title: 'Updated Post', content: 'Updated post content.' };
    const res = await request(app).put(`/posts/${postId}`).send(updatedPost);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Post updated.');
    expect(postsController.getById(postId)).toEqual({ ...updatedPost, id: postId });
  });

  test('DELETE /posts/:postId should delete a post', async () => {
    const postId = 1;
    const res = await request(app).delete(`/posts/${postId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Post deleted.');
    expect(postsController.getById(postId)).toBeUndefined();
  });
});
