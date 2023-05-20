var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/testPost').then((res) => {
  console.log("連線成功");
}).catch((err) => {
  console.log("連線失敗", err);
})

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/postss', postsRouter);
app.use('/postsas', postsRouter);

module.exports = app;
