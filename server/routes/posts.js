const express = require('express')
const router = express.Router()
const postCtrl = require('../controllers/posts');

router.get('/', postCtrl.listPosts);
router.get('/byauthor/:id', postCtrl.listPostsByAuthor);
router.put('/like/:id', postCtrl.likePost);

router.post('/', postCtrl.postPost);
router.post('/comment/:id', postCtrl.addComm);

router.get('/:id', postCtrl.getOnePost);

router.delete('/:id', postCtrl.deletePost);

router.put('/:id', postCtrl.updatePost);

module.exports = router
