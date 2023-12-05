const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
