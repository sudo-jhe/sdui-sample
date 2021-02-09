import Vue from 'vue'
import App from './App.vue'
import PortalVue from 'portal-vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from "@/store/store";
import router from "@/router/router";

Vue.use(PortalVue)  // Bootstrap Toast
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
  components: {App}
}).$mount('#app')
