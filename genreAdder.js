var genreAdder = Vue.extend({
  template: `
      <div class="modal-header">
          <h3>New Genre</h3>
      </div>

      <div class="modal-body">
          <label class="form-label">
              Name
              <input type = "text" v-model="name" class="form-control">
          </label>
          <label class="form-label">
              Description
              <textarea v-model="desc" rows="5" class="form-control"></textarea>
          </label>
      </div>
      <div class="modal-footer text-right">
          <button class = "ui positive basic button" @click="addGenre()">
              Add Genre
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

    close: function(){
      this.$dispatch('closeModal')
    },
  }

});
