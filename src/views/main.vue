<template>
  <div class="pro-admin">
    <v-header></v-header>

    <router-view></router-view>
  </div>
</template>

<script>

  import header from "@/components/header/index";

  export default {
    data () {
      return {

      }
    },
    components: {
      'v-header' : header,
    },
    created: function(){

    },
    methods: {

    },
    mounted: function () {

    },
    beforeRouteEnter (to, from, next) {
//      console.log(to);
      next()
    },
    beforeRouteUpdate (to, from, next){
      next()
    }


  }
</script>

<style lang="less" scoped>

</style>
