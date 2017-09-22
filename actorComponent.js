var actorComponent = Vue.extend({
  props: ['actor'],

  template: `
    okk
    <div class = "item">
        <img class="ui avatar image" src="tom.jpg">

        <div class="content">
          <a href = "/actor/{{actor.name}}">
            <div class="header">{{actor.name}}</div>
          </a>
          {{actor.bio}}
        </div>
    </div>
  `
})
