// tầng giao tiếp với database
const userModel = require('../models/User');

exports.getUsers = async () => {
    const users = await userModel.find({}).populate('order');
    return users;
}

exports.getUserById = async (id) => {
    const user = await userModel.findById(id).populate('order');
    return user;
}
exports.insert = async (user) => {
    const u = new userModel(user);
    await u.save();
}
exports.login = async (email) => {
    const user = await userModel.findOne({ email: email }, 'id email password');
    return user;
}
exports.register = async (email, password, age, image, phone, points, userType_id, name, order) => {
    const user = new userModel({ email, password, age, image, phone, points, userType_id, name, order });
    return await user.save();
}
exports.getSumUser = async () => {
    const sumUsers = await userModel.find({}).count();
      return sumUsers;
  }
