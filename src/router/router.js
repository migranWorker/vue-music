import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      redirect:'/recommend',
      children:[
        {
          path:'recommend',
          name:'recommend',
          component:() => import('@/views/Recommend')
        },
        {
          path:'ranking',
          name:'ranking',
          component:() => import('@/views/Ranking')
        },
        {
          path:'singer',
          name:'singer',
          component:() => import('@/views/Singer')
        }
      ]
    },
    {
      path:'/songsheet',
      name:'songsheet',
      component:() => import('@/views/SongSheet')
    },  
    {
      path:'*',
      redirect:'/'
    }
  ]
})
