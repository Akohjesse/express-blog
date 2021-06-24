const path =  require('path');
const express = require('express');

const app = new express();

module.exports = (req, res) => {
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
}