const ChatModel = require('../models/ChatModel');

const getChat = async (req, res) => {
  console.log('in <<<<<<<<');
  let { page, perPage, room } = req.query;
  console.log(room, '<<<<<<<');

  page = page ? parseInt(page) : 1;
  perPage = perPage ? parseInt(perPage) : 10;

  const filter = {};
  if (room) {
    filter.room = room;
  }

  try {
    const chats = await ChatModel.find(filter)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    const count = await ChatModel.countDocuments(filter);

    res.status(200).send({
      message: 'success',
      data: chats,
      page,
      perPage,
      totalPage: Math.ceil(count / perPage),
      count,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports = {
  getChat,
};
