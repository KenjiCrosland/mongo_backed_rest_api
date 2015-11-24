//Made with help from in class code

var mongoose = require('mongoose');
var express = require('express');
var fs = require('fs');
var app = express();
var recipesRouter = require(__dirname + '/routes/recipes_routes');
var ingredientsRouter = require(__dirname + '/routes/ingredients_routes');
var authRouter = require(__dirname + '/routes/auth_routes');
process.env.APP_SECRET = process.env.APP_SECRET = "changeme" //Use secret key
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/recipe_database');

app.use(recipesRouter);
app.use(ingredientsRouter);
app.use(authRouter);

app.get('/:filename', function(req, res){
  fs.stat(__dirname + '/build/' + req.params.filename, function(err, stats){
    if (err) {
      console.log(err);
      return next();
    }

    if (!stats.isFile()) return next();

    var file = fs.createReadStream(__dirname + '/build/' + req.params.filename);
    file.pipe(res);
  });
});

app.use(function(req, res){
  res.status(404).send('could not find file');
});

app.listen(process.env.PORT || 3000, function(){
  console.log('server up');
})
