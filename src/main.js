import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vue-clipboard'
import './plugins/custom-buttons'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './styles/my-fonts.styl'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
