<template>
	<div class="obj_hearder">
	  <div class="header_cont clear">
      <div class="jus_logo">LOGO</div>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <!--<div class="nav link logo">-->
          <!--<div class="nav">LOGO</div>-->
        <!--</div>-->
        <template  v-for="(item , index) in routerData" v-if="index < 3">
          <el-submenu :index="item.path" v-if="item.children && item.children.length > 0">
            <template slot="title">
              {{item.meta.title}}
            </template>
            <el-menu-item v-for="(itemChild , index) in item.children" :index="itemChild.path" :key="index" >
              <span>{{itemChild.meta.title}}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item :index="item.children ? item.children : item.path" v-else>
            {{item.meta.title}}
          </el-menu-item>
        </template>
        <div class="nav link" @click="logout">
          <div class="nav">退出</div>
        </div>
      </el-menu>
      <!--<div class="nav logout" @click="logout">-->
        <!--<img src="../assets/img/header/logout.png" alt="">-->
      <!--</div>-->
		</div>
	</div>
</template>

<script>

export default {
	data () {
			return {
        routerData: []
			}
	},
	components: {

	},
	created: function(){

	},
	methods: {
		logout (){
			this.$LocalStorage.remove('apiKey');
			this.$router.push('/login');
		},
    handleSelect(key, keyPath) {
      this.$router.push(key);
    }
	},
	mounted: function () {
    this.routerData = _.find(this.$router.options.routes, (o)=>{
      return o.name === 'Main'
    }).children;
  }
}
</script>

<style lang="less">
  @import "./index.less";
</style>
