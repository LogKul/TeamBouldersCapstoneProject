var createError = require('http-errors');
var cors = require('cors')
var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const helmet = require('helmet');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var gamesRouter = require('./routes/games');
var chatsRouter = require('./routes/chats');
var reportsRouter = require('./routes/reports');

var corsOptions = {
  origin: process.env.ORIGIN_ADDRESS,
  optionsSuccessStatus: 200
}

const app = express();
//Helmet Security Policies
app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
      includeSubdomains: true,
    },
    frameGuard: {
      action: "deny",
    },
    noSniff: {
    },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        upgradeInsecureRequests: [],
        blockAllMixedContent: [],
      }
    },
    permittedCrossDomainPolicies: {
      permittedpolicies: "none",
    },
    referrerPolicy: {
      policy: "no-referrer",
    },
    crossOriginEmbedderPolicy: {
    },
    crossOriginOpenerPolicy: {
      policy: "same-origin",
    },
    crossOriginResourcePolicy: {
      policy: "same-origin",
    },
    xssFilter: {
    },
    hidePoweredBy: {
    },
  })
);
app.use(cors(corsOptions))
console.log(corsOptions)

// Some middleware required for PostgreSQL connector (pg)
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// DB initialization
var db = require("./models");
db.sequelize.sync();

/*
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/games', gamesRouter);
app.use('/chats', chatsRouter);
app.use('/reports', reportsRouter);

/*
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

module.exports = app;
