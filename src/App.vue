<template>
  <div id="app">

    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

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
  .mint-indexlist-nav{
    background-color:rgba(0,0,0,0);
    position: fixed;
    border-left:none;
    top:1.42rem;
    right: 0;
}
.mint-indexsection-index{
    height:.54rem;
    background-color: #eee;
    padding: 0;
    padding-left:.2rem;
    line-height: .54rem;
    color:#666;
}
.mint-cell-wrapper{
    border-bottom: .02rem solid #ddd;
}
.mint-indexlist-content{
    margin-right: 0 !important;
}
.mint-indexlist-navlist{
    color: #00bcd4;
}
.mint-indexlist-indicator{
  position:absolute;
  top:50%;
  height:50%;
  background: black;
  width: 50px;
  height:50px;
  color: white;
}
</style>
