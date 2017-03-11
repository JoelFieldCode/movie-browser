// Route for listing all the movies from the API
page('/movies.html', function(){
    view.toggleSearchBoxes("block");
    document.getElementById("movieSearch").value = "";
    
    document.getElementById("movieListHeader").innerHTML = "";
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

// Route for listing all the actors from the API
page('/actors', function(context){
  view.toggleSearchBoxes("block");
  document.getElementById("actorSearch").value = "";
  document.getElementById("actorListHeader").innerHTML = "";
  document.getElementsByClassName("actors")[0].style.display = "block";
  document.getElementsByClassName("movies")[0].style.display = "none";
  document.getElementsByClassName("genres")[0].style.display = "none";
  document.getElementsByClassName("movieDetail")[0].style.display = "none";
  document.getElementById("movieDetailIcon").style.display = "none";
  document.getElementsByClassName("actorDetail")[0].style.display = "none";
  
  document.getElementById("detailHeader").innerHTML = "";
  if(model.actors.length > 0){
      view.addActorsList(model.actors);
      return;
  }
  console.log(page.base())
  database.downloadData(view.addActorsList);
});

// Route for listing all the genres from the API
page('/genres', function(context){
    view.toggleSearchBoxes("block");
    document.getElementById("genreSearch").value = "";
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

// Route for the detail view for an actor
page('/actor/:id', function(context){
    var elements = document.getElementsByClassName("item");
    view.removeMenuSelections(elements);
    
    view.toggleSearchBoxes("none");
    
    document.getElementById("movieListHeader").innerHTML = "Movies from this actor:"
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
    view.toggleSearchBoxes("none");
    document.getElementById("actorListHeader").innerHTML = "Actors in this genre:";
    document.getElementById("movieListHeader").innerHTML = "Movies from this genre:";
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
    view.toggleSearchBoxes("none");
    document.getElementById("actorListHeader").innerHTML = "Actors in this movie:";
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

page('*', function(context){
    console.log("here");
    page.redirect('/movies.html');
});
page.start();

var controller = {
    
    // User typed into search filter in view, send the text to model for filtering
    runFilter: function(e,type){
        var filteredArray = model.filter(e,type);
        
        // Apply filter based on which view the input came from
        
        if(type === "movies"){ 
            view.addMovies(filteredArray)
            return;
        }
        
        if(type === "genres"){ 
            view.addGenres(filteredArray) 
            return;
        }
        
        view.addActorsList(filteredArray)
    }
}

