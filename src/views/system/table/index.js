
import  { HTTP_URI } from '@/config';

export default {
  name: 'Management',
  data () {
    return {
      list: [],
      info: {
        name: '',
        date: '',
        address: ''
      },
      pageIndex: 1,
      pageSize: 70,
      totalCount: 1000,
      cardType: 'add',
      infoDialogVisible: false,
      tableloading: true
    }
  },
  mounted() {
    // 页面挂载
    this.getList();
  },
  methods: {
    getList () {
      this.tableloading = true;
      this.$http.post('/findList',{
        distributor: this.distributor,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        siteName: this.siteName,
        status: this.status
      }).then((response)=>{
        console.log(response);
        this.list = response.content;
        this.totalCount = response.totalCount;
        this.tableloading = false;
      }).catch((error)=>{
        console.log(error);
        this.tableloading = false;
      })
    },
    getPtev (p){
      this.pageIndex = p;
      this.getList();
    },
    getNext (p){
      this.pageIndex = p;
      this.getList();
    },
    currentChange (p){
      this.pageIndex = p;
      this.getList();
    },
    // 删除
    del (item){
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // do something
        console.log(item)
      }).catch(() => {
      });
    },
    // 显示卡片
    showCard (type, info) {
      this.cardType = type;
      this.infoDialogVisible = true;
      this.info = info ? info : {
        name: '',
        date: '',
        address: ''
      }
    },
    changeHandle (item) {
      console.log(item)
      let info = item;
      this.showCard('change', info);
    },
    save () {
      let canSave = true;
      if (this.info.name === '') {
        canSave = false;
      }
      if (this.info.address === '') {
        canSave = false;
      }
      if (this.info.date === '' || this.info.endDate === null) {
        canSave = false;
      }
      if (!canSave) {
        this.$message({
          type: 'error',
          message: '请将信息输入完整',
          duration: 1500
        });
        return
      }
      console.log(this.info);
    },
    searchHandle () {
      this.pageIndex = 1;
      this.getList();
    },
    //检查手机号码
    isPoneAvailable(nb) {
      var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(nb)) {
        return false;
      } else {
        return true;
      }
    }
  },
  filters: {

  }
}
