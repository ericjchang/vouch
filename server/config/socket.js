const socket = require('socket.io');
const ChatModel = require('../models/ChatModel');
const UserController = require('../controllers/UserController');

module.exports = server => {
  const io = socket(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', socket => {
    console.log('connected');
    socket.on('login', async ({ name, room }, cb) => {
      console.log(`${name} joined room : ${room}, id: ${socket.id}`);
      try {
        const { user, error } = UserController.createUser(socket.id, name, room);

        if (error) return cb(error);

        socket.join(user.room);
        io.in(room).emit('Users', UserController.getAllUsers(room));

        cb();
      } catch (err) {
        console.error(err);
        cb(err);
      }
    });

    socket.on('sendMessage', async (message, cb) => {
      console.log('message', message);
      const user = UserController.getUserById(socket.id);
      if (user?.name) {
        try {
          const chat = new ChatModel({
            username: user.name,
            message,
            room: user.room,
            createdAt: new Date(),
          });
          await chat.save();

          io.in(user.room).emit('message', { username: user.name, message });
          cb();
        } catch (err) {
          console.error(err);
          cb(err);
        }
      } else {
        cb('Username not found');
      }
    });

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} disconnected`);
      const user = UserController.deleteUserById(socket.id);
      if (user) {
        io.in(user.room).emit('Users', UserController.getAllUsers(user.room));
      }
    });
  });

  return io;
};
