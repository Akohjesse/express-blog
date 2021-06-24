const path = require('path');
const {config, engine} = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const Post = require('./database/models/Post')

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

app.get('/posts/new', (req ,res)=>{
    res.render('create')
})

app.get('/posts/css/styles.css', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'public/css/styles.css'));
});app.get('/post/css/styles.css', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'public/css/styles.css'));
})

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

app.post("/posts/store", (req, res) => {
    const {
        image
    } = req.files

    image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
        Post.create({
            ...req.body,
            image: `/posts/${image.name}`
        }, (error, post) => {
            res.redirect('/');
        });
    })
});

app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
});
app.get('/', async (req, res) => {
    const posts = await Post.find({})
    res.render('index', {posts})
});
app.listen(2000, ()=>{
    console.log('App listening on port 2000')
});