const path = require('path');
const {config, engine} = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const MongoStore = require('connect-mongo');
const expressSession = require('express-session')
const Post = require('./database/models/Post')

const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser');
const loginController = require("./controllers/login");
const loginUserController = require('./controllers/loginUser');

const app = new express();

const port = process.env.PORT || 3338;

mongoose.connect('mongodb://localhost:27017/node-blog', {useNewUrlParser: true})
.then(
    ()=> 'You are now connected to mongo!'
)
.catch(err => console.error('something went wrong'))


app.use(expressSession({
    secret: 'secret',
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/node-blog' ,
        dbName: 'node-blog'
    }) 
}));


app.use(express.static('public'));
app.use(fileUpload())

app.use(engine);
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({
    extended: true
}));

const storePost = require('./middleware/storePost')
app.use('/posts/store', storePost)

app.get('/posts/new', createPostController)

app.get(['/posts/css/styles.css', '/post/css/styles.css', '/auth/css/styles.css'], (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'public/css/styles.css'));
});

app.get('/fervent.jpg', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/assets/img/fervent.jpg'))
})
app.get('/about.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'));
})
app.get('/contact', (req, res) => {
    res.redirect('https://ferventdev.netlify.app/contact');
})
app.get('/post.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'));
})
app.post("/posts/store", storePostController);
app.get('/post/:id', getPostController);
app.get('/', homePageController);
app.get('/auth/login', loginController);
app.get("/auth/register", createUserController);
app.post("/users/register", storeUserController);
app.post('/users/login', loginUserController);
app.listen(port);