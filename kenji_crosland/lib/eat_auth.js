var eat = require('eat');
var User = require(__dirname + '/../models/user');

module.exports = exports = function(req, res, next) {
  var token = req.headers.token || (req.body)? req.body.token : '';
  if (!token){
    return res.json({msg: 'authentiCat seyz noe!1111@! and is watching youuuu!'});
  }
  eat.decode(token, process.env.APP_SECRET, function(err, decoded){
    if (err) {
      console.log(err);
      return res.json({msg: 'authenitCat seyz noe!1111@!'})
    }

    User.findOne({_id: decoded.id}, function(err, user){
      if (err) {
        console.log(err);
        return res.status(401).json({msg: 'authentiCat seyz noe121!'})
      }

      if (!user) {
        console.log(err);
        return res.status(401).json({msg: 'authentiCat seyz noe121!'})
      }

      req.user = user;
      next();
    })
  })
};
