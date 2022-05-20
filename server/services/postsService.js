const Post = require('../models/Post');

exports.list = () => {
    return Post.find();
}

exports.findByAuthor = (author) => {
    return Post.find({author: author});
}

exports.save = (newPost) => {
    return Post.create(newPost);
}

exports.findById = (id) => {
    return Post.findById(id);
}

exports.update = (id, updatedPost) => {
    return Post.findByIdAndUpdate(id, updatedPost);
}

exports.delete = (id) => {
    return Post.findByIdAndDelete(id);
}
