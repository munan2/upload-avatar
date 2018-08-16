import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '../page/Index.vue'
import Share from '../page/Share.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: 'share',
      name: 'share',
      component: Share
    }
  ]
})
