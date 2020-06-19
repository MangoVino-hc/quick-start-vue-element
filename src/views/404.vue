<template>

  <div class="cantainer">
    <div class="main">
      404
    </div>
    <div class="ts">
      You visit the  page does not exist!
    </div>
  </div>

</template>

<script>

  export default {
    data () {
      return {

      }
    },
    components: {

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

<style scoped>
  .cantainer {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: vertical;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    background-color: rgba(160, 207, 255, 0.1);
    color: #2c3e50;
  }
  .main {
    margin-top: -80px;
    font-size: 80px;
  }
</style>
