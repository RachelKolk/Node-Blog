const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const postsRouter = require('./posts/posts-router.js');
const usersRouter = require('./users/users-router.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.use('/posts', postsRouter);
server.use('/users', usersRouter);

server.get('/', (req, res) => {
    res.send(`<h1>Node Blog API</h1>`);
  });

module.exports = server;