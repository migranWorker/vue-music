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
    .fade-enter-active, .fade-leave-active,
     {
      transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ ,
    .down-enter, .down-leave-to
    {
      opacity: 0;
    }
    .down-enter-active, .down-leave-active{
      transition:  opacity 1s;
    }



.no-mode-translate-fade-enter-active ,.no-mode-translate-in-enter-active{
  transition: all 1s;
}

.no-mode-translate-fade-enter, .no-mode-translate-fade-leave-active {
  opacity: 0;
}
.no-mode-translate-fade-enter {
  transform: translateX(150px);
}
.no-mode-translate-fade-leave-active {
  transform: translateX(-250px);
}
  }
</style>
