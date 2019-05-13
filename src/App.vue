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

    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
      transform: translateX(10px);
      opacity: 0;
    }
  }
</style>
