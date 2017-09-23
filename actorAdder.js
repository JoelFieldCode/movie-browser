var actorAdder = Vue.extend({
  template: `
      <div class="modal-header">
          <h3>New Actor</h3>
      </div>

      <div class="modal-body">
          <label class="form-label">
              Name
              <input type = "text" v-model="name" class="form-control">
          </label>
          <label class="form-label">
              bio
              <textarea v-model="desc" rows="5" class="form-control"></textarea>
          </label>
      </div>
      <div class="modal-footer text-right">
          <button class = "ui positive basic button" @click="addActor()">
              Add Actor
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
