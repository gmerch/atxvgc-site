import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueGtag from "vue-gtag";
import ToggleSwitch from 'vuejs-toggle-switch';
import Meta from 'vue-meta';


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(ToggleSwitch)
Vue.use(Meta,  {
  keyName: 'metaInfo',
  attribute: 'data-vue-meta',
  ssrAttribute: 'data-vue-meta-server-rendered',
  tagIDKeyName: 'vmid',
  refreshOnceOnNavigation: true
})

import CategoryPage from './views/CategoryPage.vue'
import StandingsPage from './views/StandingsPage.vue'
import BlogPost from './components/BlogPost.vue'
import About from './views/About.vue'
import Resources from './views/Resources.vue'
import Homepage from './views/Homepage.vue'
import UsageStats from './components/UsageStats.vue'
import AuthorPage from './views/AuthorPage.vue'




const routes = [
  {
    path: '/',
    component: Homepage,
    meta: {
      'title': 'ATX VGC',
      'metaTags': [
        {
          'name': 'twitter:site',
          'content': 'ATXVGC'
        },
        {
          'name': 'twitter:card',
          'content': 'summary'
        },
        {
          'name': 'twitter:description',
          'content': "ATX VGC is the Home of the Austin Texas VGC Community"
        },
        {
          'name': 'twitter:title',
          'content':'ATX VGC'
        },
        {
          'name': 'twitter:image',
          'content':'./assets/logo.png'
        },
        {
          'property': 'og:title',
          'content': 'ATX VGC'
        },
        {
          'property': 'og:type',
          'content': 'website'
        },
        {
          'property': 'og:image',
          'content': './assets/logo.png'
        },
        {
          'property': 'og:description',
          'content':  "ATX VGC is the Home of the Austin Texas VGC Community"
        }
      ]
    }
  },
  {
    path: '/home',
    component: Homepage,
    meta: {
      'title': 'ATX VGC',
      'metaTags': [
        {
          'name': 'twitter:site',
          'content': 'ATXVGC'
        },
        {
          'name': 'twitter:card',
          'content': 'summary'
        },
        {
          'name': 'twitter:description',
          'content': "ATX VGC is the Home of the Austin Texas VGC Community"
        },
        {
          'name': 'twitter:title',
          'content':'ATX VGC'
        },
        {
          'name': 'twitter:image',
          'content':'./assets/logo.png'
        },
        {
          'property': 'og:title',
          'content': 'ATX VGC'
        },
        {
          'property': 'og:type',
          'content': 'website'
        },
        {
          'property': 'og:image',
          'content': './assets/logo.png'
        },
        {
          'property': 'og:description',
          'content':  "ATX VGC is the Home of the Austin Texas VGC Community"
        }
      ]
    }
  },
  {
    path: '/articles',
    component: CategoryPage,
    meta: {
      'title': 'ATX VGC Articles',
      'metaTags': [
        {
          'name': 'twitter:site',
          'content': 'ATXVGC'
        },
        {
          'name': 'twitter:card',
          'content': 'summary'
        },
        {
          'name': 'twitter:description',
          'content': "ATX VGC VGC Articles Page"
        },
        {
          'name': 'twitter:title',
          'content':'Articles | ATX VGC'
        },
        {
          'name': 'twitter:image',
          'content':'./assets/logo.png'
        },
        {
          'property': 'og:title',
          'content': 'Articles | ATX VGC'
        },
        {
          'property': 'og:type',
          'content': 'website'
        },
        {
          'property': 'og:image',
          'content': './assets/logo.png'
        },
        {
          'property': 'og:description',
          'content':  "ATX VGC's Articles"
        }
      ]
    }
  },
  {
    path: '/team-reports',
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
    name: 'blogpost-redirect',
    redirect: '/blog/:slug',
  },
  {
    path: '/blog/:slug',
    name: 'blogpost',
    component: BlogPost,
    props: true
  },
  {
    path: '/author/:authorname',
    name: 'authorpage',
    component: AuthorPage
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
  config: { id: process.env.VUE_APP_UA_TAG}
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


