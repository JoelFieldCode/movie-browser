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
              <input type = "text" v-model="genre" class="form-control">
          </label>

          <label class="form-label">
              Rating
              <input type = "text" v-model="rating" class="form-control">
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
      desc: "",
    }
  },

  methods: {

    addMovie: function(){
      var formData = {
        name: this.name,
        rating: this.rating,
        genre: this.genre,
        desc: this.desc
      };

      database.addMovie(formData, function(){
        this.close();
      }.bind(this));
    },

    close: function(){
      this.$dispatch('closeModal')
    },
  }

});
