var movieComponent = Vue.extend({
  props: ['movie'],

  template: `

      <div class="item">
        <div class="ui small image">
          <img src="fake-movie-x-men-in-black.jpg">
        </div>
        <div class="content">

          <a href = "/movie/{{movie.name}}" class="header"> {{movie.name}}</a>
          <div class="description">
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.
            </p>
          </div>
          <div class="extra">
            <div class="ui label">
                <i class="fa fa-star" aria-hidden="true"></i> {{movie.rating}}
            </div>
            {{movie.genre}}
        </div>
      </div>
    </div>
  `
})
