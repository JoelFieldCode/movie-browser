var database = {

    dealWithError: function(error){
        if(error.message === "Network Error"){
            notific8("Network error, please try another time.", { color: 'ruby' });
            return;
        }

        if(error.status === 422){
          var str = "";
          for(var err in error.responseJSON){
            str += `${error.responseJSON[err]} , `
          }
          notific8(str, { color: 'ruby' });

          return;
        }
        
        if(error.status === 404){
          notific8("Coudn't find that actor, movie or genre, please use the links provided on this page", { color: 'ruby' });
        }

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

    addMovie: function(formData, callback){
      $.ajax({
        type: "POST",
        url: auth.addMovie,
        data: formData,
        success: callback,
        error: this.dealWithError,
        dataType: "json",
      });
    },

    // Get a specific movie (by using the name ID) and it's relationships from the API
    getMovie: function(id){
      axios.get(auth.allMovies+'/'+id)
        .then(function(response) {
          // Save this key & data locally so we don't have to get it again for this movie
          mainController.detailMovie = response.data;

      })
      .catch(function(error){
        this.dealWithError(error)
      }.bind(this));
    },

    // Get a specific actor (by using the name ID) and it's relationships from the API
    getActor: function(id){
      axios.get(auth.allActors+'/'+id)
        .then(function(response) {
          mainController.detailActor = response.data;
        })
        .catch(function(error){
          this.dealWithError(error)
        }.bind(this));
    },

    // Get a specific genre (by using the name ID) and it's relationships from the API
    getGenre: function(id){
      axios.get(auth.allGenres+'/'+id)
        .then(function(response) {
          mainController.detailGenre = response.data;
        })
        .catch(function(error){
          this.dealWithError(error)
        }.bind(this));
    },
};
