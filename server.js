var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/2blog');
var flash = require('connect-flash');
var session = require('express-session');

var blogRoutes = require('./routes/blog');
var userRoutes = require('./routes/user');
var commentRoutes = require('./routes/comment');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Passport stuff..

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

app.use(function(req, res, next){
  console.log("Atleast I am trying to do something...")
  next();
})

app.use(express.static('public'));

app.set('view engine', 'ejs');

var port = process.env.PORT || 8080;

app.get('/', function(req, res){
  res.render('index')
});

app.get('/blog', function(req, res){
  res.render('blog');
});

app.get('/post', function(req, res){
  res.render('post');
});

app.use('/api', blogRoutes);
app.use('/api/blogs', commentRoutes);


app.listen(port, function(){
  console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 fired up 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 \n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 on " + port + " 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥")
});