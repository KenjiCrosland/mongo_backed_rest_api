//Created with help from http://mongoosejs.com/docs/index.html
var mongoose = require('mongoose');
var reviewSchema = require(__dirname + '/review.js').reviewSchema;

var recipeSchema = mongoose.Schema({
  title: String,
  ingredients: Array,
  user: String,
  userId: String,
  reviews: [reviewSchema]
});

var Recipe = module.exports.Recipe = mongoose.model('Recipe', recipeSchema);
