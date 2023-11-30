const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/indexRouter');
const instructorRouter = require('./routes/instructor');
const classroomRouter = require('./routes/classroom');
const termRouter = require('./routes/termRouter').router;
const courseOfferingRouter = require('./routes/courseOffering');
// story34 view courses
const viewCoursesRouter = require('./routes/course');
const adminRouter = require('./routes/administrationRouter');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routers
app.use('/', indexRouter);
app.use('/instructor', instructorRouter);
app.use('/term/', termRouter);
app.use('/course-offering', courseOfferingRouter);
app.use('/course', viewCoursesRouter); // story34 view courses
app.use('/classroom', classroomRouter);
app.use('/administration', adminRouter);

// bootswatch
app.use('/bw', express.static(__dirname + '/node_modules/bootswatch/dist'));

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
