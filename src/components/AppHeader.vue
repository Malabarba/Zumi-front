<template>
  <nav id="header" class="navbar is-fixed-top">
    <div class="special-shadow"></div>

    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="../assets/images/logo.svg"/>
        </router-link>

        <router-link class="navbar-item is-hidden-desktop" to="/login">Login</router-link>

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

        <div v-if="me.first_name" class="navbar-end">
          <router-link class="navbar-item" :to="{ name: 'UpdateMe' }" exact>{{me.first_name}}</router-link>
          <a class="navbar-item" href="/sair" @click.prevent="logout()" append>Sair</a>
        </div>
        <div v-else class="navbar-end">
          <router-link class="navbar-item" to="/login" exact>Login</router-link>
          <router-link class="navbar-item" to="/cadastro" exact>Cadastro</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Api from '@/api'

export default {
  data() { return { me: Api.me.state } },
  methods: {
    logout() { Api.me.logout().then(() => window.location = '/') }
  }
}
</script>

<style lang="scss">
@import '../assets/_variables.scss';

nav#header {
  .special-shadow {
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), transparent);
    height: 8px;
    width: 100%;
    position: absolute;
    left: 0;
    top: 100%;
  }

  .navbar-menu .router-link-active {
    border-bottom: 5px solid;
  }

  .navbar-brand img {
    margin-top: 0;
    margin-bottom: 0;
    max-height: 2.2rem;
  }
}
</style>
