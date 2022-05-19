const Post = require('../models/Post');
const postService = require('../services/postsService');

exports.listPosts = async (req, res) => {
    postService.list()
    .then((posts) => {
        res.status(201).json(posts);
    })
    .catch((error) => {
        res.status(400).json({error});
    });
}

exports.postPost = (req, res) => {
    const newPost = new Post({
      ...req.body
    });

    postService.save(newPost)
    .then(() => {
        res.status(201).json({
            message: 'Post created.'
        });
    })
    .catch((error) => {
        res.status(400).json({error});
    });
}

exports.getOnePost = async (req, res) => {

    const id = req.params.id;
    postService.findById(id)
    .then((post) => {
        res.status(200).json(post);
    })
    .catch((error) => {
        res.status(400).json({error});
    });
}

exports.updatePost = async (req, res) => {

    const updatedPost = new Post({
        ...req.body
    });

    const id = req.params.id;
    postService.update(id, updatedPost)
    .then(() => {
        res.status(201).json({
            message: 'Post updated.'
        });
    })
    .catch((error) => {
        res.status(400).json({error});
    });
}

exports.deletePost = async (req, res) => {

    const id = req.params.id;
    postService.delete(id)
    .then(() => {
        res.status(201).json({
            message: 'Post deleted.'
        });
    })
    .catch((error) => {
        res.status(400).json({error});
    });
}