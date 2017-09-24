var movieActorAdder = Vue.extend({
  template: `
      <h3> Add Actor to {{movie.name}} </h3>

      <select class = "ui dropdown" v-model="selectedActor">
        <option value = {{actor.name}} v-for="actor in actors | removeAlreadyExistantActors">
          {{actor.name}}
        </option>
      </select>

      <button class = "ui positive basic button" @click="addActorToMovie()">
          Add Actor
      </button>
  `,

  filters: {

    removeAlreadyExistantActors: function(actors){
      if(!this.movie.hasOwnProperty('actors')){
        return actors;
      }

      return actors.filter(function(actor){
        return this.movie.actors.filter(function(movieActor){
          return movieActor.name === actor.name
        }).length === 0;
      }.bind(this));
    }
  },

  props: ['movie'],

  data: function(){
    return {
      selectedActor: "",
      actors: [],
    }
  },

  ready: function(){

    this.$http.get(auth.allActors).then(response => {
      this.actors = response.body;
      if(this.actors.length > 0){
        this.selectedActor = this.actors[0].name;
      }
    }, this.dealWithError);

  },

  methods: {

    addActorToMovie: function(){

      var formData = {
        movie: this.movie,
        actor: this.selectedActor,
      };

      mainController.addActorToMovie(formData, function(){
        window.location.reload();
      }.bind(this));

    },
  }

});
