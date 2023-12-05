const users = [];

const createUser = (id, name, room) => {
  const normalizedName = name.trim().toLowerCase();
  const normalizedRoom = room.trim().toLowerCase();

  const _user = users.find(
    user => user.name.trim().toLowerCase() === normalizedName && user.room.trim().toLowerCase() === normalizedRoom
  );

  if (_user) return { error: 'Username has already taken' };

  if (!name || !room) return { error: `Username and room can't be empty` };

  const user = { id, name, room };
  users.push(user);
  return { user };
};

const getUserById = id => {
  const user = users.find(user => user.id === id);
  return user;
};

const deleteUserById = id => {
  const i = users.findIndex(user => user.id === id);
  if (i !== -1) return users.splice(i, 1)[0];
};

const getAllUsers = room => {
  if (room) {
    return users.filter(user => user.room === room);
  }
  return users;
};

module.exports = {
  createUser,
  getUserById,
  deleteUserById,
  getAllUsers,
};
