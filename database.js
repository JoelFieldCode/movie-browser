var database = {

    // On loadup, get all the genres,movies and actors (general information about each model - not detail view information with relationships etc)
    downloadData : function(callbackFunc){
        axios.all([
            database.getMovies(),
            database.getGenres(),
            database.getActors()
          ])
          .then(axios.spread(function (movies, genres, actors) {
              // Assign movies,genres and actors to the model;
              model.movies = movies.data.slice();
              model.genres = genres.data.slice();
              model.actors = actors.data.slice();

              // Apply callback given by controller
              callbackFunc(model.movies);
          }))
          .catch(function(error){
              view.dealWithError(error)
          });
    },

    // Return API request for all movies
    getMovies : function(){
        axios.get(auth.allMovies).then(function(movies){

          mainController.movies = movies.data;
        });
    },

    // Return API request for all movies
    getGenres: function(){
      axios.get(auth.allGenres).then(function(response){
        mainController.genres = response.data;
      });
    },

    // Return API request for all movies
    getActors: function(){
      axios.get(auth.allActors).then(function(response){
        console.log(response);
        mainController.actors = response.data;
      });
    },

    // Get a specific movie (by using the name ID) and it's relationships from the API
    getMovie: function(id){
      axios.get(auth.allMovies+'/'+id)
        .then(function(response) {
          // Save this key & data locally so we don't have to get it again for this movie
          mainController.movie = response.data;
      })
      .catch(function(error){
        view.dealWithError(error)
      });
    },

    // Get a specific actor (by using the name ID) and it's relationships from the API
    getActor: function(id, callbackFunc){
      axios.get(auth.allActors+'/'+id)
        .then(function(response) {
          // Save this key & data locally so we don't have to get it again for this actor

          model.detailActors[id] = response.data;
          // Apply callback given by view
          callbackFunc(model.detailActors[id]);
        })
        .catch(function(error){
          view.dealWithError(error)
        });
    },

    // Get a specific genre (by using the name ID) and it's relationships from the API
    getGenre: function(id, callbackFunc){
      axios.get(auth.allGenres+'/'+id)
        .then(function(response) {
          // Save this key & data locally so we don't have to get it again for this genre
          model.detailGenres[id] = response.data;

          // Apply callback given by view
          callbackFunc(model.detailGenres[id]);
        })
        .catch(function(error){
          view.dealWithError(error)
        });
    },
};
