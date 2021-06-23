const path = require('path');
const {config, engine} = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./database/models/Post')

const app = new express();
mongoose.connect('mongodb://localhost:27017/node-blog', {useNewUrlParser: true})
.then(
    ()=> 'You are now connected to mongo!'
)
.catch(err => console.error('something went wrong'))

app.use(express.static('public'));

app.use(engine);
app.set('views', __dirname + '/views');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/posts/new', (req ,res)=>{
    res.render('create')
})

app.get('/posts/css/styles.css', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'public/css/styles.css'));
})

app.get('/about.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'));
})

app.get('/index.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'));
})
app.get('/contact.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
})

app.get('/post.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'));
})
    
app.post('/posts/store', (req,res)=> {
  Post.create(req.body, (error, post)=> {
      res.redirect('/')
  })
})

app.get('/post:id', async(req,res)=>{
    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
})
app.get('/', async (req, res) => {
    const posts = await Post.find({})
    res.render('index', {posts})
});
app.listen(5000, ()=>{
    console.log('App listening on port 5000')
});