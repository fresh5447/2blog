require('dotenv').config();
 
var express = require('express');
var anything = express.Router();
var Twit = require('twit');

var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,
})


anything.route('/:keyword')
  .get(function(req, res){
    T.get('search/tweets', { q: req.params.keyword +' since:2011-07-11', count: 100 }, function(err, data, response) {

      var myTweetsArr = data.statuses.map(function(item){
        return { text: item.text, user_name: item.user.screen_name, created_at: item.created_at, profile_img: item.user.profile_image_url  }
      });

      res.json(myTweetsArr)
    })
  })

module.exports = anything;

