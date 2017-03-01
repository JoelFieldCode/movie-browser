var database = {
    downloadData : function(callbackFunc){
        axios.all([
            database.getMovies(), 
            database.getGenres(), 
            database.getActors()
          ])
          .then(axios.spread(function (movies, genres, actors) {
              model.movies = movies.data.slice();
              model.genres = genres.data.slice();
              model.actors = actors.data.slice();
              callbackFunc(model.movies); 
          }));
    },
    
    getMovies : function(){
        return axios.get(auth.allMovies);
    },
    
    getGenres: function(){
       return axios.get(auth.allGenres);
    },
    
    getActors: function(){
      return axios.get(auth.allActors);
    },
    
    getMovie: function(id,callbackFunc){
      axios.get(auth.allMovies+'/'+id)
        .then(function(response) {
          model.detailMovies[id] = response.data;
          callbackFunc(model.detailMovies[id]);
      });
    },
    
    getActor: function(id){
      return axios.get(auth.allActors+'/'+id);
    },
    
    getGenre: function(id, callbackFunc){
      axios.get(auth.allGenres+'/'+id)
        .then(function(response) {
          model.detailGenres[id] = response.data;
          callbackFunc(model.detailGenres[id]);
        })
    },
};