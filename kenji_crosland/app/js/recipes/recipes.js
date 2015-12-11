module.exports = function(app){
  require('./controllers/recipes_controller')(app);
  require('./directives/recipe_form_directive')(app);
};
