//Made with help of in class code.
var express = require('express');
var bodyParser = require('body-parser');
var Recipe = require(__dirname + '/../models/recipe').Recipe;
var Review = require(__dirname + '/../models/review').Review;
var eatAuth = require(__dirname + '/../lib/eat_auth');

var recipeRouter = module.exports = express.Router();

recipeRouter.get('/recipes', bodyParser.json(), function(req, res){
  Recipe.find({userId: req.user._id}, function(err, data){
    if (err) throw err;
    res.json(data);
  });
});

recipeRouter.get('/allrecipes', function(req, res){
  Recipe.find({}, function(err, data){
    if (err) throw err;
    res.json(data);
  });
});

recipeRouter.post('/recipes', bodyParser.json(), function(req, res){
  var newRecipe = new Recipe(req.body);
  //newRecipe.userId = req.user._id;
  //newRecipe.user = req.user.username;
  newRecipe.save(function(err, data){
    if (err) throw err;
    res.json(data);
  });
});

//Pushing a new review to the recipes review array
recipeRouter.put('/recipes/review/:id', bodyParser.json(), function(req, res){
  var reviewData = req.body;
  Recipe.update({_id: req.params.id}, {$push: {reviews: reviewData}}, function(err){
    if (err) throw err;
    res.json({msg: 'Review Added!'});
  });
});

recipeRouter.put('/recipes/:id', bodyParser.json(), function(req, res){
  var recipeData = req.body;
  Recipe.update({_id: req.params.id}, recipeData, function(err){
    if (err) throw err;
    res.json({msg: 'Recipe updated!'});
  });
});

recipeRouter.delete('/recipes/:id', bodyParser.json(), function(req, res){
  Recipe.remove({_id: req.params.id}, function(err){
    if (err) return err;
    res.json({msg: 'Recipe deleted!'});
  });
});
