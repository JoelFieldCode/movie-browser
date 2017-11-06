// Route for listing all the movies from the API
page('/', function(){
    mainController.getMovies();
    return;
});

// Route for listing all the actors from the API
page('/actors', function(context){
  mainController.getActors();
  return;
});

// Route for listing all the genres from the API
page('/genres', function(context){
   mainController.getGenres();
});

// Route for the detail view for an actor
page('/actor/:id', function(context){
    mainController.getActor(context.params.id);
});

// Route for the detail view for an actor
page('/genre/:id', function(context){
   mainController.getGenre(context.params.id);
});

// Route for the detail view for an actor
page('/movie/:id', function(context){
    mainController.getMovie(context.params.id);

});

page('*', function(context){
    page.redirect('/');
});

page.start({
  context: {
    handled: true
  }
});
