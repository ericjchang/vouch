const mongoose = require('mongoose');

module.exports = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    await mongoose.connect(MONGODB_URI);
    console.log(`🤖 : DB connected ${MONGODB_URI}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
