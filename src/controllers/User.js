const userService = require('../services/User');
const bcrypt = require('bcryptjs');
exports.getUsers = async () => {
    let data = await userService.getUsers();
    data = data.map((item,index) => {
        item = {
            _id: item._id,
            name: item.name,
            age: item.age,
            image: item.image,
            email: item.email,
            password: item.password,
            phone: item.phone,
            points: item.points,
            userType_id: item.userType_id,
            order: item.order,
            index: index + 1
        }
        return item;
    })
    return data;
}

exports.getUserById = async(id) => {
    let user = await userService.getUserById(id);
    user = {
        _id: user._id,
        name: user.name,
        age: user.age,
        image: user.image,
        email: user.email,
        password: user.password,
        phone: user.phone,
        points: user.points,
        userType_id: user.userType_id,
        order: user.order,
    }
    return user;
}
exports.insertUser = async (body) =>{
    await userService.insert(body);
}

exports.login = async (email,password) => {
    const user = await userService.login(email);
    if(!user) return null;
    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) {
        return null;
    }
    return {_id : user._id, email : user.email}
}
exports.register = async(email,password, confirm_password) => {
    if(password != confirm_password) return null;
    let user = await userService.login(email);
    if(user) return null;
    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    user = await userService.register(email,hash,age=null,image="",phone=null,points=1,userType_id=null,name = "", order = []);
    return {_id: user._id};

}
exports.getSumUsers = async () => {
    const sum =  await userService.getSumUser();
     return sum;
 }