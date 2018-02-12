<template>
  <footer v-once class="footer is-paddingless">
    <div class="section container">
      <div class="columns">
        <div class="column">
          <h2 id="produtos">Produtos</h2>
          <ul>
            <li><router-link to="/imoveis">Encontre o seu Imóvel dos sonhos</router-link></li>
            <li><router-link to="/venda-seu-imovel">Venda o seu Imóvel</router-link></li>
            <li><router-link to="/seja-um-visitador">Seja um visitador</router-link></li>
          </ul>
        </div>
        <div class="column">
          <h2 id="zumi">Zumi</h2>
          <ul>
            <li><router-link to="/como-funciona">Como Funciona</router-link></li>
            <li><router-link to="/como-funciona" fragment="aspectos-legais">Aspectos Legais</router-link></li>
          </ul>
        </div>
        <div class="column">
          <h2 id="duvidas">Dúvidas</h2>
          <ul>
            <li><a href="mailto:meajuda@zumi.com.br">Fale Conosco: <span>contato@zumi.com.br</span></a></li>
            <li><a href="tel:11-XXXX-XXXX">Suporte: <span>(11) XXXX-XXXX</span></a></li>
            <li><a href="tel:11-XXXX-XXXX">Ouvidoria: <span>(11) XXXX-XXXX</span></a></li>
          </ul>
        </div>
      </div>

      <!--Social Icons-->
      <!-- <social-icons></social-icons> -->

      <small>Copyright © 2017-{{ year }}. Todos os direitos reservados. Zumi S.A. – CNPJ ...</small>
    </div>
  </footer>
</template>

<script>
 export default {
   computed: {
     year: () => (new Date()).getFullYear()
   }
 }
</script>

<style scoped lang="scss">
@import '../assets/_variables.scss';
</style>
