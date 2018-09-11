import Vue from 'vue/dist/vue';
import './iview';
import App from './AppModule.vue';
import store from './store/store';
import routers from './router/routers';
import './common.sass';


/* app */
const app: Vue = new Vue({
  el: '#vue-app',
  store,
  router: routers,
  components: {
    App
  },
  template: '<App />'
});

if(module.hot){
  module.hot.accept();
}