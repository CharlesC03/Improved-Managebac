import Vue from 'vue';
// import browser from '../../dist/js/background';
import App from './App.vue';
// browser.storage.sync.get({
//   kitten: { name: 'Mog', eats: 'mice' },
//   monster: { name: 'Kraken', eats: 'people' },
// });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (h) => h(App),
});
