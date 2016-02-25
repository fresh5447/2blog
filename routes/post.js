var express = require('express');
var router = express.Router();

var Post = require('../models/post')

router.route('/posts')
  .get(function(req, res){
    Post.find()
    .populate('comments')
    .exec(function(err, posts){
      if(err){
        console.log(err)
      } else {
        res.json(posts)
      }
    })
  })
  .post(function(req, res){

    var post = new Post();
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.author = req.body.author || 'douglas';

    post.save(function(err, post){
      if(err){
        console.log(err)
      } else {
        res.json(post)
      }
    })
  });

router.route('/posts/:post_id')
  .get(function(req, res){
    Post.findById(req.params.post_id, function(err, post){
      if(err){
        console.log(err)
      } else {
        res.json(post)
      }
    })
  })
  .delete(function(req, res){
    Post.remove({_id: req.params.post_id}, function(err){
      if(err){
        console.log(err)
      } else {
        res.json({message: 'post deleted'})
      }
    })
  })

module.exports = router;