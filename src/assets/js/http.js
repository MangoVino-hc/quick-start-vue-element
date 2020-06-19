
import axios from 'axios'
import { Message } from 'element-ui';
import qs from 'qs'
import  { HTTP_URI } from '@/config';

import store from './store';
import router from "../../router";
const CancelToken = axios.CancelToken;

axios.defaults.baseURL = HTTP_URI;

/*
* @desc Content-Type
* -> 'application/x-www-form-urlencoded;charset=UTF-8' || 'application/json'
* */
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Authorization'] = '';
axios.defaults.withCredentials = false;

// 配置发送请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(config)
  config.headers['Authorization'] = window.localStorage.getItem('apiKey') || '';
  if(config.method  === 'post'){
    if (config.headers['Content-Type'] !== 'application/json') {
      config.data = qs.stringify(config.data);
    }
  }
  config.cancelToken = new CancelToken((cancel) => {
    store._axiosPromiseCancel.push(cancel);
  });
  // console.log(config)
	return config;
}, function (error) {
	// 对请求错误做些什么
  //console.log(error)
	return Promise.reject(error);
});


// 返回数据时做些什么
axios.interceptors.response.use(function (response) {
  // console.log(response)

  if (response.data.code !== '200' || response.status !== 200){
    Message({
      type: 'error',
      message: response.data.msg,
      duration: 1500
    });
    return Promise.reject(response.data)
  }
  if (response.data.code === '200' || response.status === 200) {
    return response.data.data
  }

}, function (error) {

  // Do something with response error
  if (axios.isCancel(error)) {
    // 为了终结promise链 就是实际请求 不会走到.catch(rej=>{});这样就不会触发错误提示之类了。
    return new Promise(() => {});
  }else{
    console.log(error)
    // 未登录
    if (error.response.status == 401){
      router.push('/login');
      window.localStorage.removeItem('apiKey');
      return Promise.reject(error.response.data || '')
    }
    Message({
      type: 'error',
      message: error.response.data.Message,
      duration: 1500
    });

    return Promise.reject(error.response.data || '')
  }

});


export default {
  install: function (vm) {
    vm.prototype.$http = axios
  }
}
