var genreComponent = Vue.extend({
  props: ['genre','detail'],

  mixins: [detailMixin],

  filters: {

      fixGenreActorIssue: function(actors){

        var actorsArray = [];
        for(var actorKey in actors){
            actorsArray.push({
                name: actorKey,
                bio: actors[actorKey].bio
            });
        }

        return actorsArray;

      }
  },

  template: `

    <div class = "item" v-show="!detailChecker">
        <div class = "genreLabel {{genre.name}}">
            <a href = "/genre/{{genre.name}}">
              {{genre.name}}
            </a>
          </div>
    </div>

    <div v-show="detailChecker">
      <div class = "item">
          <div class = "genreLabel {{genre.name}}">
              <a href = "/genre/{{genre.name}}">
                {{genre.name}}
              </a>
            </div>
      </div>
    </div>

    <div class = "movies" v-show="detailChecker">

     <h3 class="ui header" id = "movieListHeader"> Movies in genre: {{genre.name}}</h3>

     <div class="ui divided items" id = "movieListItemContainer">
       <template v-for="movie in genre.movies">
         <movie-component :movie = "movie" detail="false">

         </movie-component>
       </template>
     </div>
    </div>

    <div class = "actors" v-show="detailChecker">

      <h3 class="ui header" id = "actorListHeader">
        Actors in genre: {{genre.name}}
      </h3>
      <div class="ui horizontal list" id = "actorList">
        <template v-for="actor in genre.actors | fixGenreActorIssue">
          <actor-component detail="false" :actor = "actor">

          </actor-component>
        </template>
      </div>
    </div>


  `
})
