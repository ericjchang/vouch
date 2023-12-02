const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
  },
  roomId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Room',
  },
});

const User = new mongoose.Model('User', userSchema);

module.exports = User;
