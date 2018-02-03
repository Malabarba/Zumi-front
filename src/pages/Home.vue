<template>
  <div>
    <section class="hero is-medium is-bold">
      <div class="hero-body">
        <header class="section container">
          <!-- <button class="button is-primary is-large" routerLink="/imoveis">Ver Imóveis</button> -->
          <listing-filter-box>
            <div class="has-text-centered"><h1 class="title">Encontre sua casa dos sonhos em São Paulo</h1></div>
          </listing-filter-box>
        </header>
      </div>
    </section>

    <section class="section container">
      <div class="columns">
        <article id="comprador" class="column is-6">
          <div>
            <h2 class="title is-4">Porque comprar conosco?</h2>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
              est et expedita distinctio. Nam libero tempore, cum soluta nobis est
              eligendi optio cumque nihil impedit quo minus id quod maxime placeat
              facere possimus, omnis voluptas assumenda est, omnis dolor
              repellendus.</p>
          </div>
          <div class="has-text-centered">
            <a class="button is-primary" routerLink="/imoveis">Ver Imóveis</a>
          </div>
        </article>

        <article id="vendedor" class="column is-6">
          <div>
            <h2 class="title is-4">Seja um Vendedor</h2>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
              est et expedita distinctio. Nam libero tempore, cum soluta nobis est
              eligendi optio cumque nihil impedit quo minus id quod maxime placeat
              facere possimus, omnis voluptas assumenda est, omnis dolor
              repellendus.</p>
          </div>
          <div class="has-text-centered">
            <a class="button is-primary" routerLink="/imoveis">Quero Vender</a>
          </div>
        </article>
      </div>
    </section>

    <!-- FOOTER -->
    <app-footer></app-footer>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
