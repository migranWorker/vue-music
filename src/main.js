import '@/assets/reset.css'
import 'swiper/dist/css/swiper.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import axios from 'axios'
import MyHeader from '@/components/MyHeader.vue'
import NavBar from '@/components/NavBar.vue'
import MySwiper from '@/components/Swiper.vue'
import MyTitle from '@/components/MyTitle.vue'
import MusicItem from '@/components/MusicItem.vue'
import MusicShow from '@/components/MusicShow.vue'
import LogoFooter from '@/components/LogoFooter.vue'



Vue.config.productionTip = false
Vue.prototype.$http = axios

//过滤器
Vue.filter('numChange',(value) =>{
  if(value == undefined){
    return 0;
  }
  return  (value/10000).toFixed(1);
})

//全局组件
Vue.component(MyHeader.name,MyHeader)
Vue.component(NavBar.name,NavBar)
Vue.component(MySwiper.name,MySwiper)
Vue.component(MyTitle.name,MyTitle)
Vue.component(MusicItem.name,MusicItem)
Vue.component(MusicShow.name,MusicShow)
Vue.component(LogoFooter.name,LogoFooter)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
