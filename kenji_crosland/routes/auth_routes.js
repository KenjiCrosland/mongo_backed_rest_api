var express = require('express');
var jsonParser = require('body-parser').json();
var basicHttp = require(__dirname + '/../lib/basic_http_authenication');
var User = require(__dirname + '/../models/user');

var authRouter = module.exports = exports = express.Router();

authRouter.post('/signup', jsonParser, function(req, res){
  var user = new User();
  user.auth.basic.username = req.body.username;
  user.username = req.body.username;
  user.hashPassword(req.body.password);

  user.save(function(err,data){
    //consider handle-error from handle server error.
    if (err) throw err;
    //profit
    res.json({msg: 'user created'});

  });
  //check if the username is unique
})

authRouter.get('signin', basicHttp, function(req, res){
  if (!(req.auth.username && req.auth.password)) {
    console.log('no basic auth provided');
    return res.status(401).json({msg: 'authentiCat seayz noe!'});
  }

  User.findOne({'auth.basic.username': req.auth.username}. function(err, user){
    if (err) {
    console.log('no basic auth provided');
    return res.status(401).json({msg: 'authentiCat seayz noe!'});
    }
    if (!user){

    }
    if (!user.checkPassword(req.auth.password)) {

    }
    res.json({msg: 'authentiCat has deterimined you are you but be weary.'})
  })
})
