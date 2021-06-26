"use strict";

var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  username: String,
  image: String,
  createdAt: {
    type: Date,
    "default": new Date()
  }
});
var Post = mongoose.model('Post', PostSchema);
module.exports = Post;