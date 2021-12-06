import Vue from 'vue'
import App from './app.vue'
import CompositionApi from '@vue/composition-api'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(CompositionApi)

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
