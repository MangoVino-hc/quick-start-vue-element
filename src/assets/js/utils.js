/**
 * Vue的插件，用来获取和设置localStorage存储
 **/
//import Vue from 'vue'

let __LocalStorage = {
	set (key, data) {
		return window.localStorage.setItem(key, window.JSON.stringify(data));
	},
	get (key) {
		return window.JSON.parse(window.localStorage.getItem(key));
	},
	remove (key) {
		return window.localStorage.removeItem(key);
	}
}

//Vue.prototype.$LocalStorage = __LocalStorage

export default {
  install: function (vm) {
    vm.prototype.$LocalStorage = __LocalStorage
  }
}
