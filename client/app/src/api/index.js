import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.http.options.root = '/api';

export const messages = Vue.resource('messages{/id}');
