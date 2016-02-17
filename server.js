var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/2blog');

var blogRoutes = require('./routes/blog');
var commentRoutes = require('./routes/comment');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.set('view engine', 'ejs');

var port = process.env.PORT || 8080;

app.get('/', function(req, res){
  res.send('index')
});

app.use('/api', blogRoutes);
app.use('/api/blogs', commentRoutes);


app.listen(port, function(){
  console.log("app listening on port " + port)
});