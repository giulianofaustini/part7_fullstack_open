const blogsRouter = require('express').Router();
const { request, response } = require('express');
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post('/:id/comments' , async (request, response, next) => {
  const { comment } = request.body

  try {
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' });
    }

    blog.comments.push({ comment: comment });
    await blog.save();

    response.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    next(error);
  }
});


blogsRouter.post('/', async (request, response, next) => {
  const { body } = request;

  console.log('Received POST request with body:', body);

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Title and URL are required' });
  }
  if (!request.token) {
    return response.status(401).json({ error: 'Token missing or invalid' });
  }
  if (!body.likes) {
    body.likes = 0;
  }

  try {
    console.log('Token received:', request.token);
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    console.log('Decoded token:', decodedToken);
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return response.status(404).json({ error: 'No users found in the database' });
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const user = request.user;
    console.log('If I try from the frontEnd to delete a blog, this is the User before the try/catch:', user);

    console.log('Blog ID:', request.params.id);

    const blog = await Blog.findById(request.params.id);
    console.log('Blog in delete that return blog:', blog);

    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' });
    }
    console.log('Here it seems to pass the if !blog statement, and the blog is:', blog);

    if (!user || !user.id || !blog.user || blog.user.toString() !== user.id.toString()) {
      return response.status(403).json({ error: 'Permission denied' });
    }

    console.log('Here it seems to pass the if !blog statement, and the blog is:', user);

    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
      console.error('Error fetching person by ID. Insert the right ID number.');
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const { body } = request;
  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  try {
    const updatedBlogDoc = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true });
    if (updatedBlogDoc) {
      response.json(updatedBlogDoc);
    } else {
      response.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
