const Post = require('../models/Post');
const Comment = require('../models/Comment');
const postService = require('../services/postsService');

exports.listPosts = async (req, res) => {
    postService.list()
    .then((posts) => {
        res.status(200).json(posts);
    })
    .catch((error) => {
        res.status(400).json({error});
    });
}

exports.listPostsByAuthor = async (req, res) => {
    const authorId = req.params.id;
    postService.listByAuthor(authorId)
    .then((posts) => {
        res.status(200).json(posts);
    })
    .catch((error) => {
        res.status(400).json({error});
    });
}

exports.likePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.body.userId;

    const postFound = await postService.findById(postId);

    if (postFound) {
        if (postFound.author._id != userId) {
            if (postFound.likes.includes(userId)) {
                postFound.likes = postFound.likes.filter(i => i != userId);
            }
            else {
                postFound.likes.push(userId);
            }
            postFound.save()
            .then(() => {
                res.status(201).json({
                    message: 'Post liked.' + postFound.likes.length
                });
            })
            .catch((error) => {
                res.status(400).json({error});
            });
        }
        else {
            console.log('il like son propre post !');
        }
    }
}

exports.addComm = async (req, res) => {
    const postId = req.params.id;
    const author = req.body.author;
    const content = req.body.content;


    let post = await postService.findById(postId);

    let comm = new Comment();
    comm.content = content;
    comm.author = author;
    comm.save()
    .then(() => {
        post.comments.push(comm);
  
        post.save()
        .then(() => {
          res.status(201).json({ message: 'Comm added.' });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
        res.status(400).json({ error });
    });

}

exports.postPost = (req, res) => {
    const newPost = new Post({
       title: req.body.title,
       content: req.body.content,
       author: req.body.author,
       publication: Date.now()
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