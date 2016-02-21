var express = require('express');
var router = express.Router();

var Blog = require('../models/blog')

router.route('/blogs')
  .get(function(req, res){
    Blog.find()
    .populate('comments')
    .exec(function(err, blogs){
      if(err){
        console.log(err)
      } else {
        res.json(blogs)
      }
    })
  })
  .post(function(req, res){

    var blog = new Blog();
    blog.title = req.body.title;
    blog.content = req.body.content;
    blog.image = req.body.image;
    blog.author = req.body.author || 'douglas';

    blog.save(function(err, blog){
      if(err){
        console.log(err)
      } else {
        res.json(blog)
      }
    })
  });

router.route('/blogs/:blog_id')
  .get(function(req, res){
    Blog.findById(req.params.blog_id, function(err, blog){
      if(err){
        console.log(err)
      } else {
        res.json(blog)
      }
    })
  })
  .delete(function(req, res){
    Blog.remove({_id: req.params.blog_id}, function(err){
      if(err){
        console.log(err)
      } else {
        res.json({message: 'blog deleted'})
      }
    })
  })

module.exports = router;