module.exports = function(app){
  require('./controllers/recipes_controller')(app);
  require('./directives/card_directive')(app);
  require('./directives/recipe_form_directive')(app);
};
