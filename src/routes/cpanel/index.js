var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const authentication =require('../../../middleware/authentication');

const authController = require('../../controllers/Auth');
/**
 * http:/localhost:3000/login
 * method : get
 * detail : hiển thị trang login
 * author : Hồ Thành Đạt
 * date   : 17/03/2022
 */
/* http://localhost:3000/login */
 router.get('/login', function(req, res, next) {
  res.render('authentication/login', { layout: 'authentication/index' });
 });

/** 
* http://localhost:3000/login
* method : post
* detail : thực hiện đăng nhập
* author : Hồ Thành Đạt
* date   : 17/03/2022
*/
router.post('/login', async function(req, res, next) {
  const{email,password} = req.body;
  const result = await authController.loginAdmin(email,password);
  if(result){
    //secret key
    const token = jwt.sign({
       id: result._id, username: result.username
    },'hothanhdat');
    req.session.token = token;
    res.redirect('/dashboard');
  }else{
    res.redirect('/login');
  }
});
  /**
* http:/localhost:3000/logout
* method : get
* detail : thực hiện đăng xuất
* author : Hồ Thành Đạt
* date   : 17/03/2022
*/
router.get('/logout',function(req,res,next){
  req.session.destroy(function(err){
    res.redirect('/login');
  })
});

module.exports = router;


