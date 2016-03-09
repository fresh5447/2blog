var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Comment = require('../models/comment');
var Post = require('../models/post');

// var anonUser = { local:
//                   {  email: 'anon@anon.com',
//                       password: '$2a$08$k2uyfdPi1XzPGqWCAp62F.DOs/heDEFoy3axu7uygAoFKySxr5Q1S',
//                       username: 'anon dude',
//                       role: 'guest' },
//                       __v: 0,
//                       _id: '56d4cdc0e4e0bcd14e7e2713'
//                 }
//               }

router.route('/posts')
  .get(function(req, res){
    
    Post.find()
    .populate('author')
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

router.route('/posts/:post_id/comment')
  .post(function(req, res){
    console.log("trying to post a comment");

    var comment = new Comment();
    comment.body = req.body.body;
    comment.user = '56d5d2f51c0375472946539f';
    comment.blog = req.params.post_id;

    comment.save(function(err, com){
      if(err){
        res.send(err);
      } else {
     
        Post.findById(req.params.post_id, function(err, post){
          if(err){
            res.send(err)
          } else {
  
          post.comments.push(com._id);
          post.save();
          res.json(com);
          }
        })
      }
    })
    //FIND POST BY ID
    //PUSH COMMENT_ID --> POST
  })

module.exports = router;