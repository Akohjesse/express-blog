const path = require('path');
const {config, engine} = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const Post = require('./database/models/Post')


const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const getPagesController =  require('./controllers/getPages')

const app = new express();
mongoose.connect('mongodb://localhost:27017/node-blog', {useNewUrlParser: true})
.then(
    ()=> 'You are now connected to mongo!'
)
.catch(err => console.error('something went wrong'))

app.use(express.static('public'));
app.use(fileUpload())

app.use(engine);
app.set('views', __dirname + '/views');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(getPagesController)

const storePost = require('./middleware/storePost')
app.use('/posts/store', storePost)

app.get('/posts/new', createPostController)


app.post("/posts/store", storePostController);
app.get('/post/:id', getPostController);
app.get('/', homePageController);

app.listen(2000, ()=>{
    console.log('App listening on port 2000')
});