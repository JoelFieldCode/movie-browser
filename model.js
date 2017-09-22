var mainController = new Vue({
  el: "#main-controller",

  data: function(){
    return {
      movies: [],
      searchFilter: "",
      actors: [],
      genres: [],
      detailMovie: {},
      detailActor: {},
      detailGenre: {},
      showing: "movies",
    }
  },

  computed: {

    placeHolder: function(){
      if(this.showing === 'movies'){
        return "Search for movies...";
      }

      if(this.showing === 'actors'){
        return "Search for actors..";
      }
    }

  },

  methods: {

    getMovies: function(){
      this.showing = "movies"
      database.getMovies();
    },

    getMovie: function(id){
      this.showing = "movie_detail";
      database.getMovie(id);
    },

    getActors: function(){
      this.showing = "actors";
      database.getActors();
    },

    getGenres: function(){
      this.showing = "genres";
      database.getGenres();
    },
  },

  components: {
    'movie-component' : movieComponent,
    'actor-component' : actorComponent
  }

});

var model = {
    movies : [],
    genres: [],
    actors: [],

    // Unique key values for genres, actors and movies. By saving the key we don't have to make another AJAX request.
    detailGenres : {

    },
    detailActors : {

    },
    detailMovies: {

    },
    // Filter and return data based on the given type (e.g movies, actors or genres)
    filter: function(e,type){

        return this[type].filter(function(d){
            return d.name.toLowerCase().indexOf(e.value.toLowerCase()) > -1;
        });

    },
};
