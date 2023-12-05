const router = require('express').Router();
const ChatController = require('../controllers/ChatController');

router.get('/', ChatController.getChat);

module.exports = router;
