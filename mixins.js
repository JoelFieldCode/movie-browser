var detailMixin = {

    computed: {

      detailChecker: {

        cache: true,
        get: function(){
          return (this.detail === "true" ? true : false);
        }
      },
    }
};
