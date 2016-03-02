require('dotenv').load();
var express = require('express');
var path = require('path');
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var db = require('./models/db');
var blogModel = require('./models/blog');
var blogRoutes = require('./routes/blog');
var commentModel = require('./models/comment')
var morgan = require('morgan');
var passport = require('passport');
var flash = require('connect-flash');
var twitterRoutes = require('./routes/tweets');
var githubRoutes = require('./routes/github');
var fetchWakas = require('./routes/waka');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

app.set('port', (process.env.PORT || 3000));


app.use(express.static('public'));
app.set('view engine', 'ejs'); // set up ejs for templating

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms


// required for passport
app.use(session({
  secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(session({
  cookie: {
    maxAge: 60000
  }
}));
app.use(flash());

require('./config/passport')(passport);
// routes ======================================================================
require('./routes/user.js')(app, passport);

app.use('/api/blogs', blogRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/waka', fetchWakas);
app.use('/api/tweets', twitterRoutes);

app.get('/test123', function(req, res) {
  req.flash('test', 'it worked');
  res.redirect('/test')
});app.get('/test', function(req, res) {
  req.flash('test');
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});