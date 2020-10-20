import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueGtag from "vue-gtag";
import ToggleSwitch from 'vuejs-toggle-switch';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(ToggleSwitch)

import CategoryPage from './views/CategoryPage.vue'
import StandingsPage from './views/StandingsPage.vue'
import BlogPost from './components/BlogPost.vue'
import About from './views/About.vue'
import Resources from './views/Resources.vue'
import Homepage from './views/Homepage.vue'
import UsageStats from './components/UsageStats.vue'

const routes = [
  {
    path: '/',
    component: Homepage
  },
  {
    path: '/home',
    component: Homepage
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
    path: '/friendlies/standings',
    component: StandingsPage
  },
  {
    path: '/friendlies/usage',
    component: UsageStats
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

Vue.use(VueGtag, {
  config: { id: "UA-180683814-1" }
}, router);

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


