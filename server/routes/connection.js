const express = require('express')
const router = express.Router()
const connectionCtrl = require('../controllers/connection');

router.post('/', connectionCtrl.connectUser);

module.exports = router
