var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/2blog');
var flash = require('connect-flash');
var session = require('express-session');

var postRoutes = require('./routes/post');
var userRoutes = require('./routes/user');
var commentRoutes = require('./routes/comment');

var Post = require('./models/post')

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

app.use(function(req, res, next){
  var user = req.user || "no user";
  console.log(user);
  next();
})

app.get('/', function(req, res){
  var user = req.user || "no user";
  res.render('index', {user: user})
});

app.get('/post/:post_id', function(req, res){
    var user = req.user || "no user";
    Post.findById(req.params.post_id)
    .populate('comments')
    .exec(function(err, post){
      if(err){
        console.log(err)
      } else {
        res.render('showBlog', {post: post, user: user})
      }
    })
});

app.get('/blog', function(req, res){
  var user = req.user || "no user";
    Post.find()
    .populate('comments')
    .exec(function(err, posts){
      if(err){
        console.log(err)
      } else {
        res.render('blog', {posts: posts, user: user})
      }
    })
});

app.get('/new_post', function(req, res){
  var user = req.user || "no user";
  res.render('post', {user: user});
});

app.use('/api', postRoutes);
app.use('/api/posts', commentRoutes);


app.listen(port, function(){
  console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 fired up 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 \n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 on " + port + " 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥")
});