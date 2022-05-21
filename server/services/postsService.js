const Post = require('../models/Post');

exports.list = () => {
    return Post.find().populate('author').populate('comments');
}

exports.listByAuthor = (authorId) => {
    return Post.find({author: authorId}).populate('author').populate('comments');
}

exports.findByAuthor = (authorId) => {
    return Post.find({author: authorId});
}

exports.save = (newPost) => {
    return Post.create(newPost);
}

exports.findById = (id) => {
    return Post.findById(id).populate('author').populate('comments');
}

exports.update = (id, updatedPost) => {
    return Post.findByIdAndUpdate(id, updatedPost);
}

exports.delete = (id) => {
    return Post.findByIdAndDelete(id);
}
