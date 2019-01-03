const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');
//const checkAuth = require('./middleware/check-auth');
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');


const app = express();

// 連線mongodb
mongoose.connect('mongodb://localhost:27017/node-angular')
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((err) => {
    console.log('Connection failed', err);
  });

// 設定bodyparser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: false
}));

// 設定CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  next();
});

app.use("/api/post", postsRoutes);

app.use("/api/auth", usersRoutes);

module.exports = app;
