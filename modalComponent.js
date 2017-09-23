var modalComponent = Vue.extend({
  template: `
    <div class="modal-mask" v-show="show" @click="close">
        <div class="modal-container" @click.stop>
            <template v-if="modal_form === 'movie'">
              <movie-adder>

              </movie-adder>
            </template>

            <template v-if="modal_form === 'actor'">
                <actor-adder>

                </actor-adder>
            </template>

            <template v-if="modal_form === 'genre'">
                <genre-adder>

                </genre-adder>
            </template>

        </div>
    </div>
  `,

  props: ['show', 'modal_form'],

  // watch: {
  //   show: function(){
  //     console.log('hi');
  //   }
  // },

  methods: {

    close: function(){
      this.$dispatch('closeModal')
    },
  }

});
