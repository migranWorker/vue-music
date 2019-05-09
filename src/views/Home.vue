<template>
  <div class="home">
    <my-header></my-header>
    <nav-bar></nav-bar>
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  data(){
    return{
      
    }
  }
}
</script>

<style lang="less" scoped>
  .body{
    margin-top:.8rem;
  }
</style>
