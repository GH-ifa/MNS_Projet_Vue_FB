const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/posts');

router.get('/', userCtrl.listPosts);

router.post('/', userCtrl.postPost);

router.get('/:id', userCtrl.getOnePost);

router.delete('/:id', userCtrl.deletePost);

router.put('/:id', userCtrl.updatePost);

module.exports = router
