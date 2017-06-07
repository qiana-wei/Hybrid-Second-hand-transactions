var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var ejs = require('ejs')

var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'secondhand-transformation'); //创建一个数据库连接

//router setup
var index = require('./routes/index');
var user_api = require('./routes/user_api');
var good_api = require('./routes/goods_api');

var userModel = require('./models/users')
var goodModel = require('./models/goods')
var commentModel = require('./models/comments')

var app = express();

//设置环境
// app.set('env','production')


// view engine setup
app.set('views', path.join(__dirname, 'www'));
app.set('view engine', 'html');
app.engine('html', ejs.__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'www')));


//router usage setup
app.use('/', index);
app.use('/api/user',user_api)
app.use('/api/good',good_api)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// create connect to mongoose
var opts = {
    server: {
        sockrtOptions: {
            keeoAlive: 1
        }
    }
}

mongoose.Promise = global.Promise
switch (app.get('env')) {
    case 'development':
        mongoose.connect('mongodb://localhost:27017/development', opts);
        console.log('development');
        break;
    case 'production':
        mongoose.connect('mongodb://128.199.156.9:27017/production', opts);
        console.log('production');
        break;
    default:
        throw new Error('Unknow execution environment:' + app.get('env'))
}
module.exports = app;
