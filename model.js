
Vue.component('movie-component', movieComponent);
Vue.component('actor-component', actorComponent);
Vue.component('genre-component', genreComponent);
Vue.component('movie-adder', movieAdder);
Vue.component('actor-adder', actorAdder);
Vue.component('genre-adder', genreAdder);

Vue.component('modal', modalComponent);

var mainController = new Vue({
  el: "#main-controller",

  data: function(){
    return {
      movies: [],
      showModal: false,
      searchFilter: "",
      modalForm: "",
      actors: [],
      genres: [],
      showingList: true,
      detailMovie: {},
      detailActor: {},
      detailGenre: {},
      showing: "movies",
    }
  },

  events: {

    openModal: function(modalForm){
      this.showModal = true;
      this.modalForm = modalForm;
    },

    closeModal: function(){

      this.showModal = false;

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

      if(this.showing === 'genres'){
        return "Search for genres..";
      }
    }

  },

  filters: {

    fixUrl: function(value){
        return value.replace(/ /g, "%20");
    },
  },

  methods: {

    getPrimaryNavClass: function(key){

      if(this.showing === 'genres' || this.showing === 'genre_detail'){
        if(key === 'genres'){
          return {
            'active': true
          };
        }
      }

      if(this.showing === 'movies' || this.showing === 'movie_detail'){
        if(key === 'movies'){
          return {
            'active': true
          };
        }
      }

      if(this.showing === 'actors' || this.showing === 'actor_detail'){
        if(key === 'actors'){
          return {
            'active': true
          };
        }
      }

      return {
        'active': false
      };

    },

    getMovies: function(){
      this.showing = "movies";
      this.searchFilter = "";
      this.showingList = true;
      database.getMovies();
    },

    getMovie: function(id){
      this.showing = "movie_detail";
      this.showingList = false;
      database.getMovie(id);
    },

    getActors: function(){
      this.showing = "actors";
      this.searchFilter = "";
      this.showingList = true;
      database.getActors();
    },

    getActor: function(id){
      this.showing = "actor_detail";
      this.showingList = false;
      database.getActor(id);
    },

    getGenres: function(){
      this.showing = "genres";
      this.searchFilter = "";
      this.showingList = true;
      database.getGenres();
    },

    getGenre: function(id){
      this.showing = "genre_detail";
      this.showingList = false;
      database.getGenre(id);
    },

  },
});
