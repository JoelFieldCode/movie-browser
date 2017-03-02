
page('/marvel.html', function(){
//   if(model.movies.length > 0){
//       view.addMovies();
//       return;
//   }
//   database.downloadData(view.addMovies);
  page.redirect('/movies');
});

// Route for listing all the actors from the API
page('/actors', function(context){
  document.getElementsByClassName("actors")[0].style.display = "block";
  document.getElementsByClassName("movies")[0].style.display = "none";
  document.getElementsByClassName("movieDetail")[0].style.display = "none";
  document.getElementById("movieDetailIcon").style.display = "none";
  document.getElementsByClassName("actorDetail")[0].style.display = "none";
  
  document.getElementById("detailHeader").innerHTML = "";
  if(model.actors.length > 0){
      view.addActorsList(model.actors);
      return;
  }
  database.downloadData(view.addActorsList);
});

// Route for listing all the genres from the API
page('/genres', function(context){
    document.getElementById("detailHeader").innerHTML = "";
    document.getElementsByClassName("actors")[0].style.display = "none";
    document.getElementsByClassName("movies")[0].style.display = "none";
    document.getElementsByClassName("genres")[0].style.display = "block";
    document.getElementsByClassName("actorDetail")[0].style.display = "none";
    document.getElementsByClassName("movieDetail")[0].style.display = "none";
    document.getElementById("movieDetailIcon").style.display = "none";
    
    if(model.genres.length > 0){
      view.addGenres(model.genres);
      return;
  }
  database.downloadData(view.addGenres);
});

// Route for listing all the movies from the API
page('/movies', function(context){
    document.getElementsByClassName("actors")[0].style.display = "none";
    document.getElementsByClassName("movies")[0].style.display = "block";
    document.getElementsByClassName("genres")[0].style.display = "none";
    document.getElementsByClassName("movieDetail")[0].style.display = "none";
    document.getElementById("movieDetailIcon").style.display = "none"
    document.getElementsByClassName("actorDetail")[0].style.display = "none";
    
    document.getElementById("detailHeader").innerHTML = "";
    if(model.movies.length > 0){
        view.addMovies(model.movies);
        return;
    }
    database.downloadData(view.addMovies);

});

// Route for the detail view for an actor
page('/actor/:id', function(context){
    var elements = document.getElementsByClassName("item");
    view.removeMenuSelections(elements);
    
    document.getElementsByClassName("movies")[0].style.display = "block";
    document.getElementsByClassName("genres")[0].style.display = "none";
    document.getElementsByClassName("actors")[0].style.display = "none";
    document.getElementsByClassName("movieDetail")[0].style.display = "none";
    document.getElementsByClassName("actorDetail")[0].style.display = "block";
    
    document.getElementById("movieDetailIcon").style.display = "none";
    
    // If we already have this actor saved locally, send data straight to view
    if(model.detailActors[context.params.id] !== undefined){
        view.loadActorDetail(model.detailActors[context.params.id]);
        return;
    }
    
    // Otherwise go get the data and send a view callback to apply
    database.getActor(context.params.id,view.loadActorDetail);
    
});

// Route for the detail view for an actor
page('/genre/:id', function(context){
    var elements = document.getElementsByClassName("item");
    view.removeMenuSelections(elements);
    document.getElementsByClassName("movies")[0].style.display = "block";
    document.getElementsByClassName("genres")[0].style.display = "none";
    document.getElementsByClassName("movieDetail")[0].style.display = "none";
    document.getElementsByClassName("actors")[0].style.display = "block";
    document.getElementsByClassName("actorDetail")[0].style.display = "none";
    document.getElementById("movieDetailIcon").style.display = "none";
    
    // If we already have this genre saved locally, send data straight to view
    if(model.detailGenres[context.params.id] !== undefined){
        view.loadGenreDetail(model.detailGenres[context.params.id]);
        return;
    }
    
    // Otherwise go get the data and send a view callback to apply
    database.getGenre(context.params.id,view.loadGenreDetail);
    
    
});

// Route for the detail view for an actor
page('/movie/:id', function(context){
    var elements = document.getElementsByClassName("item");
    view.removeMenuSelections(elements);
    document.getElementsByClassName("movies")[0].style.display = "none";
    document.getElementsByClassName("genres")[0].style.display = "none";
    document.getElementsByClassName("actorDetail")[0].style.display = "none";
    document.getElementsByClassName("actors")[0].style.display = "block";
    document.getElementsByClassName("movieDetail")[0].style.display = "block";
    document.getElementById("movieDetailIcon").style.display = "inline-block";
    
    // If we already have this movie saved locally, send data straight to view
    if(model.detailMovies[context.params.id] !== undefined){
        view.loadMovieDetail(model.detailMovies[context.params.id]);
        return;
    }
    
    // Otherwise go get the data and send a view callback to apply
    database.getMovie(context.params.id,view.loadMovieDetail);
});


page.start();

