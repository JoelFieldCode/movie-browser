
Vue.component('movie-component', movieComponent);
Vue.component('actor-component', actorComponent);
Vue.component('genre-component', genreComponent);
Vue.component('movie-adder', movieAdder);
Vue.component('actor-adder', actorAdder);
Vue.component('genre-adder', genreAdder);

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-full-width",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

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

    movie_added: function(){
      this.getMovies();
    },

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

    dealWithError: function(error){

        if(error.message === "Network Error"){
            toastr.error("Network error, please try another time.");
            return;
        }

        if(error.status === 422){
          var str = "";
          console.log(error);
          for(var err in error.body){
            str += `${error.body[err]} , `
          }
          toastr.error(str);

          return;
        }

        if(error.status === 404){
          toastr.error("Coudn't find that actor, movie or genre, please use the links provided on this page");
        }

    },

    getMovies: function(){
      this.showing = "movies";
      this.searchFilter = "";
      this.showingList = true;
      this.$http.get(auth.allMovies).then(response => {
        this.movies = response.body;
      }, this.dealWithError);
      return;
    },

    getMovie: function(id){
      this.showing = "movie_detail";
      this.showingList = false;
      this.$http.get(auth.allMovies+'/'+id).then(response => {
        this.detailMovie = response.body;
      }, this.dealWithError);

    },

    addMovie: function(formData, callback){
      this.$http.post(auth.addMovie, formData, {emulateJSON: true}).then(callback, this.dealWithError);
    },

    getActors: function(){
      this.showing = "actors";
      this.searchFilter = "";
      this.showingList = true;
      this.$http.get(auth.allActors).then(response => {
        this.actors = response.body;
      }, this.dealWithError);
    },

    getActor: function(id){
      this.showing = "actor_detail";
      this.showingList = false;
      this.$http.get(auth.allActors+'/'+id).then(response => {
        this.detailActor = response.body;
      }, this.dealWithError);
    },

    addActor: function(formData, callback){
      this.$http.post(auth.addActor, formData, {emulateJSON: true}).then(callback, this.dealWithError);
    },

    getGenres: function(){
      this.showing = "genres";
      this.searchFilter = "";
      this.showingList = true;
      this.$http.get(auth.allGenres).then(response => {
        this.genres = response.body;
      }, this.dealWithError);
    },

    getGenre: function(id){
      this.showing = "genre_detail";
      this.showingList = false;
      this.$http.get(auth.allGenres+'/'+id).then(response => {
        this.detailGenre = response.body;
      }, this.dealWithError);
    },

    addGenre: function(formData, callback){
      this.$http.post(auth.addGenre, formData, {emulateJSON: true}).then(callback, this.dealWithError);
    },

  },
});
