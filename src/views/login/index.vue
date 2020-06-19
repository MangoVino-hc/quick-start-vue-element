<template>
  <div class="login_container">
    <div class="mid_cont">
      <div class="login_bx">
        <div class="title">
          <div class="txt">登录</div>
        </div>
        <div class="inp_cont">
          <div class="inner_cont">
            <div class="inner">
              <div class="inpus">
                <div class="eit">
                  <img class="ico" src="../../assets/img/login/icon1.png" alt="">
                  <input type="text" v-model="info.account" @keyup.enter="login" placeholder="账号">
                </div>
                <div class="eit">
                  <img class="ico" src="../../assets/img/login/icon2.png" alt="">
                  <input type="password" v-model="info.password" @keyup.enter="login" placeholder="密码">
                </div>
              </div>
              <div class="login_btn" @click="login">
                <div class="in_bx">登录</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import controller from './index.js';
  export default controller
</script>

<style lang="less" scoped>
  @import "./index.less";
</style>
