const express = require('express')
const router = express.Router()
const postCtrl = require('../controllers/posts');
const tokenVerify = require('../middlewares/authentication');

router.get('/', tokenVerify, postCtrl.listPosts);
router.get('/byauthor/:id', tokenVerify, postCtrl.listPostsByAuthor);
router.put('/like/:id', tokenVerify, postCtrl.likePost);

router.post('/', tokenVerify, postCtrl.postPost);
router.post('/comment/:id', tokenVerify, postCtrl.addComm);

router.get('/:id', tokenVerify, postCtrl.getOnePost);

router.delete('/:id', tokenVerify, postCtrl.deletePost);

router.put('/:id', tokenVerify, postCtrl.updatePost);

module.exports = router
