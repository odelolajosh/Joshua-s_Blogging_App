const app = require('../../app');
const { PostState } = require('../../constants');
const Post = require('../../models/Post');
const User = require('../../models/User');
const request = require('supertest').agent(app);

const userCredentials = {
  email: 'joedoe@mail.com',
  password: '123456',
  first_name: 'Joe',
  last_name: 'Doe'
}

const postCredentials = {
  title: 'Post title',
  body: 'Post body',
  description: 'Post description',
  tags: ['tag1', 'tag2'],
}

let user, token, post;

beforeAll(async () => {
  user = await User.create(userCredentials);
  token = await user.generateToken();
});

describe('GET /post', () => {
  it('should get a post', async () => {
    const res = await request.get('/post');
    expect(res.status).toBe(200);
    expect(res.body).hasOwnProperty('success', true);
    expect(res.body).hasOwnProperty('posts');
    expect(res.body.posts).toBeInstanceOf(Array);
  });
});

describe('POST /post', () => {
  it('should create a post', async () => {
    const credentials = { ...postCredentials };
    const res = await request.post('/post').set('Authorization', `Bearer ${token}`).send(credentials);
    expect(res.status).toBe(201);
    expect(res.body).hasOwnProperty('success', true);
    expect(res.body).hasOwnProperty('post');
    expect(res.body.post).toHaveProperty('title', credentials.title);
    expect(res.body.post).toHaveProperty('body', credentials.body);
    expect(res.body.post).toHaveProperty('description', credentials.description);
    expect(res.body.post).toHaveProperty('tags', credentials.tags);
    expect(res.body.post).toHaveProperty('author', user._id.toString());
    expect(res.body.post).toHaveProperty('state', PostState.DRAFT);
    post = res.body.post;
  });
});

describe('GET /post/:id', () => {
  it('should get a post', async () => {
    const res = await request.get(`/post/${post._id}`);
    expect(res.status).toBe(200);
    expect(res.body).hasOwnProperty('success', true);
    expect(res.body).hasOwnProperty('post');
    expect(res.body.post).toHaveProperty('title', post.title);
    expect(res.body.post).toHaveProperty('body', post.body);
    expect(res.body.post).toHaveProperty('description', post.description);
    expect(res.body.post).toHaveProperty('tags', post.tags);
    expect(res.body.post).toHaveProperty('author');
    expect(res.body.post.author).toHaveProperty('_id', post.author.toString());
  });
});

describe('PUT /post/:id', () => {
  it('should update a post', async () => {
    const credentials = { ...postCredentials };
    credentials.title = 'New post title';
    const res = await request.put(`/post/${post._id}`).set('Authorization', `Bearer ${token}`).send(credentials);
    expect(res.status).toBe(200);
    expect(res.body).hasOwnProperty('success', true);
    expect(res.body).hasOwnProperty('post');
    expect(res.body.post).toHaveProperty('title', credentials.title);
    expect(res.body.post).toHaveProperty('body', credentials.body);
    expect(res.body.post).toHaveProperty('description', credentials.description);
    expect(res.body.post).toHaveProperty('tags', credentials.tags);
    expect(res.body.post).toHaveProperty('author', user._id.toString());
    expect(res.body.post).toHaveProperty('state', PostState.DRAFT);
    post = res.body.post;
  });
});

describe('PATCH /post/:id/publish', () => {
  it('should publish a post', async () => {
    const res = await request.patch(`/post/${post._id}/publish`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).hasOwnProperty('success', true);
    expect(res.body).hasOwnProperty('post');
    expect(res.body.post).toHaveProperty('title', post.title);
    expect(res.body.post).toHaveProperty('body', post.body);
    expect(res.body.post).toHaveProperty('description', post.description);
    expect(res.body.post).toHaveProperty('tags', post.tags);
    expect(res.body.post).toHaveProperty('author', user._id.toString());
    expect(res.body.post).toHaveProperty('state', PostState.PUBLISHED);
    post = res.body.post;
  });
});

describe('PATCH /post/:id/unpublish', () => {
  it('should unpublish a post', async () => {
    const res = await request.patch(`/post/${post._id}/unpublish`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).hasOwnProperty('success', true);
    expect(res.body).hasOwnProperty('post');
    expect(res.body.post).toHaveProperty('title', post.title);
    expect(res.body.post).toHaveProperty('body', post.body);
    expect(res.body.post).toHaveProperty('description', post.description);
    expect(res.body.post).toHaveProperty('tags', post.tags);
    expect(res.body.post).toHaveProperty('author', user._id.toString());
    expect(res.body.post).toHaveProperty('state', PostState.DRAFT);
    post = res.body.post;
  });
});

describe('DELETE /post/:id', () => {
  it('should delete a post', async () => {
    const res = await request.delete(`/post/${post._id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).hasOwnProperty('success', true);
    const deletedPost = await Post.findById(post._id);
    expect(deletedPost).toBeNull();
  });
});