const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'RoomId is required'],
    },
    users: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    messages: {
      username: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
      message: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Room = new mongoose.Model('Room', RoomSchema);

module.exports = Room;
