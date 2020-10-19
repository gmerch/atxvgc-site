import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueGtag from "vue-gtag";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueCountdown from '@chenfengyuan/vue-countdown';

Vue.component(VueCountdown.name, VueCountdown);
Vue.use(BootstrapVue)
Vue.use(VueRouter)

import ComingSoon from './views/ComingSoon.vue'

const routes = [
  {
    path: '/',
    component: ComingSoon
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


