var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../../controllers/user')
const authentication = require('../../../middleware/authentication');
const User = require('../../models/User');

 // http://localhost:3000/api/users
 router.get('/users',[authentication.checkToken], async function(req, res, next) {
  const user = await userController.getUsers();
  res.json(user);
});

//http://localhost:3000/api/login
router.post('/login', async function(req, res, next) {
  const{email,password} = req.body;
  const result = await userController.login(email,password);
  console.log();
  if(result){
    //secret key
    const token = jwt.sign({id: result._id, username: result.username},"hothanhdat");
    res.json({ status: true, result, token });

  }else{
    res.json({ status: false})
  }
});

router.get('/users/:id/deitai',[authentication.checkToken], async function(req, res, next) {
  try {
    const {id} = req.params;
    const user = await userController.getUserById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json("Loi sevrer") 
  }
});

router.post('/users/:id/update',[authentication.checkToken], async function(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    await user.updateOne({$set: req.body});
    res.status(200).json("Update thanh cong")
  } catch (error) {
    res.status(200).json("Update fail") 
  }
});

//http://localhost:3000/api/register
router.post('/register', async function(req, res, next) {
  const{email,password,confirm_password} = req.body;
  const result = await userController.register(email,password,confirm_password);
  if(result){
    //secret key
    res.json({ status: true})
  }else{
    res.json({ status: false})
  }
});

router.post('/logout',[authentication.checkToken], async function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
        if(err) {
            return res.json({err});
        } else {
            return res.json({'logout': "Success"});
        }
    });
}
});

module.exports = router;