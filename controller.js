page('/marvel.html', function(){
    if(model.movies.length > 0){
      view.addMovies();
      return;
  }
  database.downloadData(view.addMovies);
//   page.redirect('/movies');
});

page('/actors', function(context){
    
});

page('/genres', function(context){
    
});


page('/movies', function(context){
    if(model.movies.length > 0){
      view.startPage(model);
      return;
  }
  database.downloadData(view.addMovies);
//   document.getElementsByClassName('actors').style.display = 'none'; 
//   document.getElementsByClassName('genres').style.display = 'none';
//   document.getElementsByClassName('movies').style.display = 'block';
});

page('/actor/:id', function(context){
    document.getElementsByClassName("movies")[0].style.display = "block";
    
});

page('/genre/:id', function(context){
    document.getElementsByClassName("movies")[0].style.display = "block";
    if(model.detailGenres[context.params.id] !== undefined){
        view.loadGenreDetail(model.detailGenres[context.params.id]);
        return;
    }
    database.getGenre(context.params.id,view.loadGenreDetail);
    
    
});

page('/movie/:id', function(context){
    document.getElementsByClassName("movies")[0].style.display = "none";
    if(model.detailMovies[context.params.id] !== undefined){
        view.loadMovieDetail(model.detailMovies[context.params.id]);
        return;
    }
    database.getMovie(context.params.id,view.loadMovieDetail);
});


page.start();

var controller = {
    init : function(){
        database.downloadData(view.startPage);
    }
}
