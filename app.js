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
var apis  =require('./routes/apis');

var userModel = require('./models/users')
var goodModel = require('./models/goods')
var commentModel = require('./models/comments')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'www'));
app.set('view engine', 'ejs');
app.engine('html', ejs.__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//router usage setup
app.use('/', index);
app.use('/api', routes)

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
switch (app.get('env')) {
    case 'development':
        mongoose.connect('mongodb://localhost:27017/development', opts);
        break;
    case 'production':
        mongoose.connect('mongodb://localhost:27017/production', opts);
        break;
    default:
        throw new Error('Unknow execution environment:' + app.get('env'))
}

module.exports = app;
