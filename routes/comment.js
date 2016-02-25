var express = require('express');
var router = express.Router();

var Comment = require('../models/comment');
var Blog = require('../models/post');

router.route('/:post_id/comment')
  .post(function(req, res){
    var comment = new Comment();
    comment.body = req.body.body;
    comment.post = req.params.post_id;
    comment.save(function(err, comment){
      if(err){
        console.log(err)
      } else {
        Post.findById(req.params.post_id, function(err, post){
          if(err){
            console.log('something is wrong!')
          } else {
            post.comments.push(comment._id);

            post.save();

            res.json({message: 'pushed comment!'})
          }
        })
      }
    })
  })

module.exports = router;