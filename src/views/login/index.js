export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome',
      info: {
        account: '',
        password: ''
      }
    }
  },
  mounted() {

  },
  methods: {
    login (){
      if (this.info.account.length === 0){
        this.$message.info('请输入账号');
        return
      }
      if (this.info.password.length === 0){
        this.$message.info('请输入密码');
        return
      }
      this.$http.post('/login', { ...this.info } )
      .then((response)=>{
        console.log(response);
        window.localStorage.setItem('apiKey', response.token);
        this.$router.push('/table');
      })
      .catch((error)=>{
        console.log(error);
      });
    },
  },
  filters: {

  }
}
