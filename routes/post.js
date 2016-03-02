var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var Post = require('../models/post');

var anonUser = { local:
                  {  email: 'anon@anon.com',
                      password: '$2a$08$k2uyfdPi1XzPGqWCAp62F.DOs/heDEFoy3axu7uygAoFKySxr5Q1S',
                      username: 'anon dude',
                      role: 'guest' },
                      __v: 0,
                      _id: '56d4cdc0e4e0bcd14e7e2713'
                }

router.route('/posts')
  .get(function(req, res){
    
    Post.find()
    .populate('author')
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
    post.title = req.body.title || 'none';
    post.content = req.body.content || 'none';
    post.image = req.body.image || 'none';

    post.author = req.user._id || "1342423413414";

    console.log(post.author);

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