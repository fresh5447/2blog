var express = require('express');
var router = express.Router();

var Comment = require('../models/comment');
var Blog = require('../models/blog');

router.route('/:blog_id/comment')
  .post(function(req, res){
    var comment = new Comment();
    comment.body = req.body.body;
    comment.blog = req.params.blog_id;
    comment.save(function(err, comment){
      if(err){
        console.log(err)
      } else {
        Blog.findById(req.params.blog_id, function(err, blog){
          if(err){
            console.log('something is wrong!')
          } else {
            blog.comments.push(comment._id);

            blog.save();

            res.json({message: 'pushed comment!'})
          }
        })
      }
    })
  })

module.exports = router;