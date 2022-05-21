const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/users');

router.get('/', userCtrl.listUsers);

router.post('/signup', userCtrl.postUser);

router.get('/:id', userCtrl.getOneUser);

router.delete('/:id', userCtrl.deleteUser);

router.put('/:id', userCtrl.updateUser);

module.exports = router
