
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');
const session = require('express-session');

const mongoose = require('mongoose');




require('../src/models/Auth')
require('../src/models/Category')
require('../src/models/Product')
require('../src/models/Banner')
require('../src/models/News')
require('../src/models/Order')
require('../src/models/Voucher')

//routes
var indexRouter = require('../src/routes/cpanel/index');
var productRouter = require('../src/routes/cpanel/product');
var chartRouter = require('../src/routes/cpanel/chart');
var categoryRouter = require('../src/routes/cpanel/category');

var userRouter = require('../src/routes/cpanel/user');
var newsRouter = require('../src/routes/cpanel/news');
var orderRouter = require('../src/routes/cpanel/order');
var dashBoardRouter = require('../src/routes/cpanel/dashboard');
var voucherRouter = require('../src/routes/cpanel/voucher');


var apiProduct = require('../src/routes/api/product');
var apiCategory = require('../src/routes/api/category');
var apiUser = require('../src/routes/api/user');
var apiBanner = require('../src/routes/api/banner');
var apiNews = require('../src/routes/api/news');
var apiOrder = require('../src/routes/api/order');
var apiVoucher = require('../src/routes/api/voucher');
//const { partials, helpers } = require('handlebars');
var app = express();
var helpers = require('handlebars-helpers')();
const exphbs = require('express-handlebars')
// const hbs = exphbs.create({


//   helpers: helpers
// })
var hbs = exphbs.create({
  defaultLayout: 'layout',
  extname:'hbs',
  layoutsDir: path.join(__dirname, '../src/views'),
  partialsDir: ['../src/views/'],
  helpers: helpers
});

// view engine setup
app.engine('hbs',hbs.engine);
app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
  secret: 'hothanhdat', 
  resave: true,
  saveUninitialized : true,
  cookie: {secure: false}
}))
app.use(cors());
app.all('/', function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
mongoose.connect('mongodb+srv://lavacoffee:lavacoffee@lavacoffee.lwxtpdx.mongodb.net/lavacoffee?retryWrites=true&w=majority', {  
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
.catch(err => console.log('>>>>>>>>> DB Error: ', err));
/* http://localhost:3000/ */

//routes
app.use('/', indexRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);
app.use('/chart', chartRouter);
app.use('/news', newsRouter);
app.use('/order', orderRouter);

app.use('/user', userRouter);
app.use('/dashboard', dashBoardRouter);
app.use('/voucher', voucherRouter);


app.use('/api', apiProduct);
app.use('/api', apiCategory);
app.use('/api', apiUser);
app.use('/api', apiBanner);
app.use('/api', apiNews);
app.use('/api', apiOrder);
app.use('/api', apiVoucher);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
