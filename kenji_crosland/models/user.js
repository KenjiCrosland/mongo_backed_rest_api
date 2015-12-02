//Got validation help here: http://nraj.tumblr.com/post/38706353543/handling-uniqueness-validation-in-mongomongoose

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var eat = require('eat');
var userSchema = new mongoose.Schema({
//Adding it at the beginning so it doesn't get deleted.
  username: {type: String, required: true, unique: true, trim: true},
  auth: {
    basic:{
      username: String,
      password: String
    }
  }
});

userSchema.methods.hashPassword = function(password) {
  var hash = this.auth.basic.password = bcrypt.hashSync(password, 8);
  return hash;
};

userSchema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.auth.basic.password);

};

userSchema.methods.generateToken = function(callback){
  var id = this._id;
  eat.encode({id: id}, process.env.APP_SECRET, callback);
};

module.exports = mongoose.model('User', userSchema);
