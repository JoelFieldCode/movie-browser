var movieComponent = Vue.extend({
  props: ['movie','detail'],

  mixins: [detailMixin],

  methods: {

      getGenre: function(genre){
        return {
          name: genre
        };

      }
  },

  template: `

  <div class="ui card">
    <a href = "/movie/{{movie.name}}">
    <div class="ui medium image">
      <img src="../fake-movie-x-men-in-black.jpg">
    </div>
    </a>

    <div class="content">
      <div class="header">{{movie.name}}</div>
      <div class="meta">

      </div>
      <div class="description">
        {{movie.desc}}
      </div>
    </div>
    <div class="extra content">
      <span class="right floated">
        <div class="ui label">
            <i v-for="n in parseFloat(movie.rating)"class="fa fa-star" aria-hidden="true"></i>
        </div>
      </span>
      <span>
        <genre-component :genre="getGenre(movie.genre)" detail="false">

        </genre-component>
      </span>
    </div>
    </div>

    <div class = "actors" v-if = "detailChecker">

      <h3 class="ui header" id = "actorListHeader">
        Actors in {{movie.name}}
      </h3>

      <div class="ui horizontal list" id = "actorList">
        <template v-for="actor in movie.actors">
          <actor-component detail="false" :actor = "actor">

          </actor-component>
        </template>
      </div>

      <!--
      <movie-actor-adder :movie="movie">

      </movie-actor-adder>
      -->

    </div>


  `
})
