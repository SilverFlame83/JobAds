const User = require('../models/User');

async function createUser(email, hashedPassword, description) {
   
    const user = new User({
        email,
        hashedPassword,
        description
    });

    user.save();
    return user;
}

async function getUserByEmail(email) {
    const pattern = new RegExp(`^${email}$`, "i");
    const user = await User.findOne({
      email: { $regex: pattern },
    });
  
    return user;
  }
  
  async function findById(id) {
    return User.findById(id);
  }



module.exports = {
    createUser,
    getUserByEmail,
    findById
}