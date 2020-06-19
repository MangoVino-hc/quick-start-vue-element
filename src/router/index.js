import Vue from 'vue'
import VueRouter from "vue-router";
import  { IS_DEBUG } from '@/config';
import store from '../assets/js/store';
const _ = require('lodash');

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

Vue.use(VueRouter);

const systemRoutes = [
  {
    path: '/table',
    name: 'Table',
    component: resolve => require(['@/views/system/table/index.vue'], resolve),
    meta: {
      login: true,
      title: 'Table',
      status: 'system'
    }
  },
  {
    path: '/echarts',
    name: 'Echarts',
    component: resolve => require(['@/views/system/echarts/index.vue'], resolve),
    meta: {
      login: true,
      title: 'Echarts',
      status: 'system'
    }
  },
  {
    path: '/1404',
    redirect: '/404',
    meta: {
      login: false,
      title: '404',
      status: 'system'
    }
  }
];

const mainRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: resolve => require(['@/views/login/index.vue'], resolve)
  },
  {
    path: '/',
    name: 'Main',
    component: resolve => require(['@/views/main.vue'], resolve),
    meta: {
      login: true
    },
    children: [],
    redirect: systemRoutes[0].path
  },
  {
    path: '/404',
    name: '404',
    component: resolve => require(['@/views/404.vue'], resolve)
  },
  {
    path: '*',
    redirect: '/404'
  }
];

_.find(mainRoutes, (o)=>{
  return o.name === 'Main'
}).children = systemRoutes;

const routes = mainRoutes;

//const router = new VueRouter({ routes: routes });

let router =  new VueRouter({
//	mode: 'history',  //默认hash模式，可手动更改为history模式
//	base: 'safety_web',
  routes: routes
});

router.beforeEach((to, from, next) => {
  //console.log(to);
  store._axiosPromiseCancel.forEach(e=>{
    e && e()
  });
  store._axiosPromiseCancel = [];

  if(to.matched.some((item) => item.meta.login)){

    if ( IS_DEBUG ) {
      next();
      return
    }

    if( window.localStorage.getItem('apiKey') ){  // 已经登录
      next();
    }else{
      if (to.redirectedFrom){
        router.push({
          path: '/login',
          query: {
            redirect: to.redirectedFrom.slice(1)
          }
        })
      } else {
        router.push({
          path: '/login'
        })
      }
    }

  }else{
    next();
  }

})

export default router
