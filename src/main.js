import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import dateFilter from './filters/date.filter';
import Loader from '@/components/Loader'
import Axios from 'axios'
import FileSaver from 'file-saver';
import VueObserveVisibility from 'vue-observe-visibility'

Vue.use(VueObserveVisibility)

var infiniteScroll =  require('vue-infinite-scroll');
Vue.use(infiniteScroll)

Vue.config.productionTip = false
Vue.use(Vuelidate);

Vue.filter('date', dateFilter);
Vue.component('Loader', Loader);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
