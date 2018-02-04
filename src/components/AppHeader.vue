<template>
  <nav class="navbar is-fixed-top">
    <div id="specialShadow" class="bd-special-shadow" style="opacity: 0; transform: scaleY(1);"></div>

    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="../assets/images/logo.png"/>
        </router-link>

        <router-link class="navbar-item is-hidden-desktop" to="/">Login</router-link>

        <div id="navbarBurger" class="navbar-burger burger" data-target="navMenuDocumentation">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navMenuDocumentation" class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/imoveis" exact>Buscar Imóveis</router-link>
          <router-link class="navbar-item" to="/imoveis-no-mapa" exact>Buscar no Mapa</router-link>
          <router-link class="navbar-item" to="/venda-seu-imovel" exact>Vender Imóvel</router-link>
        </div>

        <div class="navbar-end">
          <router-link class="navbar-item" to="/login" exact>Login</router-link>
          <router-link class="navbar-item" to="/cadastro" exact>Cadastro</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
@import '../assets/_variables.scss';

.navbar-menu .router-link-active {
  border-bottom: 5px solid;
}

nav {
  // -webkit-box-shadow: 0 8px 6px -6px #999;
  // -moz-box-shadow: 0 8px 6px -6px #999;
  // box-shadow: 0 8px 6px -6px #999;
  // NgxGallery uses 1000
  z-index: 3000 !important;
}

.navbar-brand img {
  margin-top: 0;
  margin-bottom: 0;
  max-height: 2.2rem;
}
</style>
