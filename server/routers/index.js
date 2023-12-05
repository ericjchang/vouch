const router = require('express').Router();
const ChatRouter = require('./Chat');

router.use('/api/chat', ChatRouter);

module.exports = router;
