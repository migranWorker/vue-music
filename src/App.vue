<template>
  <div id="app">
    <transition name="fade" mode="out-in">
        <router-view/>
    </transition>
    <Player />
  </div>
</template>
<script>
import Player from '@/views/Player.vue'
export default {
  name:'App',
  components:{
    Player
  }
}
</script>

<style lang="less">
  #app{
    max-width: 450px;
    width: 100%;
    margin:0 auto;
    .fade-enter-active, .fade-leave-active {
      transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  }
</style>
