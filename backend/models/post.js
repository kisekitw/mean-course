const mongoose = require('mongoose');;

// Definition
const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

// Turn definition to real model, then export
module.exports = mongoose.model('Post', postSchema);
