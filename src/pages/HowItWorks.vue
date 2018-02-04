<template>
  <div>
    <section id="head" class="hero is-primary is-small">
      <div class="hero-body is-paddingless">
        <header class="section container has-text-centered">
          <h1 class="title">Como a Zumi funciona</h1>
        </header>
      </div>
    </section>

    <section class="container section">
      <article id="descricao" class="content">
        <h2>O que é a Zumi?</h2>
        <p>At vero eos et accusamus et iusto odio dignissimos ducimus
          qui blanditiis praesentium voluptatum deleniti atque
          corrupti quos dolores et quas molestias excepturi sint
          occaecati cupiditate non provident, similique sunt in
          culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga.</p>
        <p>Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est
          eligendi optio cumque nihil impedit quo minus id quod
          maxime placeat facere possimus, omnis voluptas
          assumenda est, omnis dolor repellendus.</p>
      </article>
      <article id="vendedor" class="content">
        <h2>Qual a vantagem pro vendedor?</h2>
        <p>At vero eos et accusamus et iusto odio dignissimos ducimus
          qui blanditiis praesentium voluptatum deleniti atque
          corrupti quos dolores et quas molestias excepturi sint
          occaecati cupiditate non provident, similique sunt in
          culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga.</p>
      </article>
      <article id="comprador" class="content">
        <h2>Qual a vantagem pro comprador?</h2>
        <p>Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est
          eligendi optio cumque nihil impedit quo minus id quod
          maxime placeat facere possimus, omnis voluptas
          assumenda est, omnis dolor repellendus.</p>
      </article>
      <article id="aspectos-legais" class="content">
        <h2>Aspectos Legais</h2>
        <p>Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est
          eligendi optio cumque nihil impedit quo minus id quod
          maxime placeat facere possimus, omnis voluptas
          assumenda est, omnis dolor repellendus.</p>
      </article>
    </section>

    <app-footer/>
  </div>
</template>

<script>
import { buildMeta } from './meta.service'

export default {
  name: 'HowItWorks',
  head: buildMeta({
    title: 'Entenda as vantages de comprar e vender seu imóvel na Zumi',
    description: 'A Zumi é uma plataforma de compra e venda de imóveis em São Paulo. ' +
                 'Uma experiência mais simples para compradores e vendedores.'
  })
}
</script>

<style scoped lang="scss"></style>
