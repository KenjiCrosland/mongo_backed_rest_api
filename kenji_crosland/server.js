//Made with help from in class code

var mongoose = require('mongoose')
var express = require('express');
var app = express();
var recipesRouter = require(__dirname + '/routes/recipes_routes');
var ingredientsRouter = require(__dirname + '/routes/ingredients_routes');
var authRouter = require(__dirname + '/routes/auth_routes');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/recipe_database');

app.use(recipesRouter);
app.use(ingredientsRouter);
app.use(authRouter);
app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000, function(){
  console.log('server up');
})
