<template>
  <div class="ui container error-404">
    <div class="ui stackable grid">
      <div class="row">
        <div class="column">
          <header>
            <h1 class="ui header text-blue-light weight-5">Ops, não encontramos essa página!</h1>
          </header>
        </div>
      </div>
      <div class="row">
        <div class="sixteen wide column">  
          <p>
            Nossos contatos são:<br>
            <a href="mailto:mejuda@zumi.com.br">mejuda@zumi.com.br</a> <br>
          </p> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.html',
  styles: [`.error-404 {padding-bottom: 6em;}`]
})
export default { name: 'NotFoundComponent',}
</script>

<style scoped lang="scss"></style>
