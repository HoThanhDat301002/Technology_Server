//Tầng giao tiếp với database

const authModel = require('../models/Auth')
exports.login = async (email) =>{
    const auth = await authModel.findOne({email : email }, 'id email password');
    return auth;

}


