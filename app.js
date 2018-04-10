const express = require('express')
const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const rfs = require('rotating-file-stream')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const routes = require('./routes')
const dev = process.env.NODE_ENV !== 'production'
const app = express()

const logPath = path.resolve(__dirname, './log')
fs.existsSync(logPath) || fs.mkdirSync(logPath)
const accessLogStream = rfs('access.log', { interval: '1d', path: logPath })

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger({ format: dev ? 'dev' : 'combined', stream: accessLogStream }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// Routes
app.use(routes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
