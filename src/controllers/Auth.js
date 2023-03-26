//Tầng giao tiếp, xử lý với data
const authService = require('../services/Auth');
const bcrypt = require('bcryptjs');

exports.loginAdmin = async (email,password) => {
    const auth = await authService.login(email);
    if(auth && auth.password == password) {
        return auth;
    }
    return null;
}
