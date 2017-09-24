var movieAdder = Vue.extend({
  template: `
      <div class="modal-header">
          <h3>New Movie</h3>
      </div>

      <div class="modal-body">
          <label class="form-label">
              Name
              <input type = "text" v-model="name" class="form-control">
          </label>

          <label class="form-label">
              Genre
              <select class = "ui dropdown" v-model="selectedGenre">
                <option value = {{genre.name}} v-for="genre in genres">
                  {{genre.name}}
                </option>
              </select>

          </label>

          <label class="form-label">
              Rating
              <i v-for="n in rating"class="fa fa-star" aria-hidden="true"></i>
                <input class = "form-control" type="range" v-model="rating" min = "0" max = "5">
          </label>

          <label class="form-label">
              Description
              <textarea v-model="desc" rows="5" class="form-control"></textarea>
          </label>

      </div>
      <div class="modal-footer text-right">
          <button class = "ui positive basic button" @click="addMovie()">
              Add Movie
          </button>
      </div>
  `,

  // props: ['show'],

  // watch: {
  //   show: function(){
  //     console.log('hi');
  //   }
  // },

  data: function(){
    return {
      name: "",
      genres: [],
      selectedGenre: "Action",
      rating: 3,
      desc: "",
    }
  },

  ready: function(){

    this.$http.get(auth.allGenres).then(response => {
      this.genres = response.body
    }, this.dealWithError);

  },

  methods: {

    addMovie: function(){
      var formData = {
        name: this.name,
        rating: this.rating,
        genre: this.selectedGenre,
        desc: this.desc
      };

      mainController.addMovie(formData, function(){
        this.close();
        toastr.success(`Added ${this.name}!`)
        page.redirect('/movie/'+this.name);
      }.bind(this));
    },

    close: function(){
      this.$dispatch('closeModal')
    },
  }

});
