var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var eat = require('eat');
var userSchema = new mongoose.Schema({
//Adding it at the beginning so it doesn't get deleted.
  username: String,
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
  eat.encode({id: id}, process.env.APP_SECRET, callback)
  //The APP secret is a long hash of random characters
  //Restart server is going to invalidate all tokens
  //
}

module.exports = mongoose.model('User', userSchema);
