"use strict";

var path = require('path');

var _require = require('express-edge'),
    config = _require.config,
    engine = _require.engine;

var express = require('express');

var edge = require("edge.js");

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var fileUpload = require("express-fileupload");

var MongoStore = require('connect-mongo');

var expressSession = require('express-session');

var Post = require('./database/models/Post');

var auth = require("./middleware/auth");

var redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated');

var createPostController = require('./controllers/createPost');

var homePageController = require('./controllers/homePage');

var storePostController = require('./controllers/storePost');

var getPostController = require('./controllers/getPost');

var createUserController = require('./controllers/createUser');

var storeUserController = require('./controllers/storeUser');

var loginController = require("./controllers/login");

var loginUserController = require('./controllers/loginUser');

var logoutController = require("./controllers/logOut");

var app = new express();
var port = process.env.PORT || 3000;
mongoose.connect('mongodb+srv://admin_fervent:ferventdev@fervent.seg2g.mongodb.net/node-app', {
  useNewUrlParser: true
}).then(function () {
  return 'You are now connected to mongo!';
})["catch"](function (err) {
  return console.error('something went wrong');
});
app.use(expressSession({
  secret: 'secret',
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://admin_fervent:ferventdev@fervent.seg2g.mongodb.net/node-app',
    dbName: 'node-app'
  })
}));
app.use(express["static"]('public'));
app.use(fileUpload());
app.use(engine);
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({
  extended: true
}));

var storePost = require('./middleware/storePost');

app.use('/posts/store', storePost);
app.get('/posts/new', auth, createPostController);
app.get(['/posts/css/styles.css', '/post/css/styles.css', '/auth/css/styles.css'], function (req, res) {
  res.sendFile(path.resolve(__dirname, 'public/css/styles.css'));
});
app.get('/fervent.jpg', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'public/assets/img/fervent.jpg'));
});
app.get('/about.html', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'pages/about.html'));
});
app.get('/contact', function (req, res) {
  res.redirect('https://ferventdev.netlify.app/contact');
});
app.get('/post.html', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'pages/post.html'));
});
app.post("/posts/store", auth, storePost, storePostController);
app.get('/post/:id', getPostController);
app.get('/', homePageController);
app.get('/auth/login', redirectIfAuthenticated, loginController);
app.get("/auth/register", redirectIfAuthenticated, createUserController);
app.post("/users/register", redirectIfAuthenticated, storeUserController);
app.post('/users/login', redirectIfAuthenticated, loginUserController);
app.listen(port, function () {
  console.log("App listening on Port ".concat(port));
});
app.get("/auth/logout", redirectIfAuthenticated, logoutController);
app.use('*', function (req, res, next) {
  edge.global('auth', req.session.userId);
  next();
});