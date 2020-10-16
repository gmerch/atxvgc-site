import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueRouter)
import CategoryPage from './views/CategoryPage.vue'
import StandingsPage from './views/StandingsPage.vue'
import BlogPost from './components/BlogPost.vue'
import About from './views/About.vue'
import Resources from './views/Resources.vue'

const routes = [
  {
    path: '/',
    component: CategoryPage
  },
  {
    path: '/home',
    component: CategoryPage
  },
  {
    path: '/articles',
    component: CategoryPage
  },
  {
    path: '/videos',
    component: CategoryPage
  }, 
  {
    path: '/standings',
    component: StandingsPage
  },
  {
    path: '/blog/:id/:slug',
    name: 'blogpost',
    component: BlogPost,
    props: true

  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/resources',
    component: Resources
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

Vue.config.productionTip = false
Vue.filter('striphtml', function (value) {
  var div = document.createElement("div");
  div.innerHTML = value;
  var text = div.textContent || div.innerText || "";
  return text;
});


new Vue({
  render: h => h(App),
  router
}).$mount('#app')


