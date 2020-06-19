// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import md5 from 'js-md5'


import echarts from 'echarts'
import Utile from './assets/js/utils'

import Http from './assets/js/http'

import ElementUI from 'element-ui'

Vue.use(Utile)
Vue.use(Http)
Vue.use(ElementUI)

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/app.css'

Vue.config.productionTip = false;
Vue.prototype.$md5 = md5;
Vue.prototype.$echarts = echarts;

const _ = require('lodash');


/* eslint-disable no-new */
let _vue = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'development') {
  console.log = function () {
    return false
  }
}
