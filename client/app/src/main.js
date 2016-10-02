import Vue from 'vue';
import App from './App';
import store from './vuex/store';
import { getAllMessages } from './vuex/actions';

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  render: h => h(App),
});

getAllMessages(store);
