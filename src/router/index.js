import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../page/Index2.vue'
import IndexPage from '../page/Index.vue'
import Share from '../page/Share.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: 'share',
      name: 'share',
      component: Share
    },
    {
      path: 'index',
      name: 'index',
      component: IndexPage
    }
  ]
})
