const path = require('path');
const {config, engine} = require('express-edge');
const express = require('express');
const app = new express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/node-blog', {useNewUrlParser: true})
.then(
    ()=> 'You are now connected to mongo!'
)
.catch(err => console.error('something went wrong'))

app.use(express.static('public'));

app.use(engine);
app.set('views', __dirname + '/views');

app.get('/', (req , res)=> {
    res.render('index')
})

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

app.listen(3000, ()=>{
    console.log('App listening on port 3000')
})