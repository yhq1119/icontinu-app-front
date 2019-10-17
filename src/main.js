import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
// import Axios from 'axios'
// import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
//
// Vue.prototype.$axios = Axios
//
// Vue.use(Axios,VueAxios)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
