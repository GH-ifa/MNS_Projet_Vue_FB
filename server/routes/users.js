const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/users');
const tokenVerify = require('../middlewares/authentication');

router.get('/', tokenVerify, userCtrl.listUsers);

router.post('/signup', userCtrl.postUser);

router.get('/:id', tokenVerify, userCtrl.getOneUser);

router.delete('/:id', tokenVerify, userCtrl.deleteUser);

router.put('/:id', tokenVerify, userCtrl.updateUser);

module.exports = router
