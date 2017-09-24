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
              Bio
              <textarea v-model="desc" rows="5" class="form-control"></textarea>
          </label>

          <label class="form-label">
              Age
              <input type = "number" v-model="age" class="form-control">
          </label>
      </div>
      <div class="modal-footer text-right">
          <button class = "ui positive basic button" @click="addActor()">
              Add Actor
          </button>
      </div>
  `,

  data: function(){
    return {
      name: "",
      age: 20,
      bio: "",
    }
  },

  methods: {

    addActor: function(){

      var formData = {
        name: this.name,
        bio: this.bio,
        age: this.age
      };

      mainController.addActor(formData, function(){
        this.close();
        toastr.success(`Added ${this.name}!`)
        page.redirect('/actor/'+this.name);
      }.bind(this));

    },

    close: function(){
      this.$dispatch('closeModal')

    },
  }

});
