var actorComponent = Vue.extend({
  props: ['actor','detail'],

  mixins: [detailMixin],

  template: `
    <div class = "item">
        <img class="ui avatar image" src="../tom.jpg">

        <div class="content">

          <a href = "/actor/{{detailChecker ? actor.info.name : actor.name}}">
            <div class="header actor-name">
              <div v-if="detailChecker">

                {{actor.info.name}}
              </div>
              <div v-if="!detailChecker">
                {{actor.name}}
              </div>

            </div>
          </a>
          <template v-if="detailChecker">
            {{actor.info.bio}}
          </template>
          <template v-if="!detailChecker">
            {{actor.bio}}
          </template>

        </div>
    </div>

    <div class = "movies" v-show="detailChecker">

     <h3 class="ui header" id = "movieListHeader"> Movies</h3>

     <div class="ui divided items" id = "movieListItemContainer">
       <template v-for="movie in actor.movies">
         <movie-component :movie = "movie" detail="false">

         </movie-component>
       </template>
     </div>
    </div>
  `
})
