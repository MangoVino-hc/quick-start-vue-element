
import  { HTTP_URI } from '@/config';

export default {
  name: 'Echarts',
  data () {
    return {
      title: "Echarts title",
      loading: true,
      option: {
        color: ['#aecefb'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {// 坐标轴指示器，坐标轴触发有效
            type : 'shadow',// 默认为直线，可选为：'line' | 'shadow'
            shadowStyle: {
              color: 'rgba(174, 206, 251, 0.2)'
            }
          }
        },
        grid: {
          containLabel: true,
          left: 10,
          top: 16,
          right: 6,
          bottom: 10
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: ['A', 'B'],
          axisLabel: {
            show: true,
            interval: 0,
            formatter: function (value, index) {
              let day = value.replace(/^.+-.+-/, '');
              return day;
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#50576a'
            }
          },
          axisTick: {
            show: false
          },
          axisPointer: {
            lineStyle: {
              color: '#e7e5e6',
              opacity: 0.4,
              width: 1
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            // formatter: '{value} W'
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#b4b8c2'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show:true,
            lineStyle:{
              color:'#f5f4f4',
              width: 1
            }
          }
        },
        series : [
          {
            name:'',
            type:'bar',
            barMaxWidth: '70',
            itemStyle: {
              barBorderRadius: 4
            },
            data:[10, 52]
          }
        ]
      },
      echartsObjList: {}
    }
  },
  mounted() {
    // 页面挂载
    this.getEcharts();
  },
  methods: {
    showEcharts (id, option){
      let exist = false;
      let _this = this;
      for(let prop in this.echartsObjList){
        if (prop === id){
          exist = true;
          this.echartsObjList[prop].setOption(option);
        }
      }
      if (exist){return}
      this.echartsObjList[id] = this.$echarts.init(document.getElementById(id));
      this.echartsObjList[id].setOption(option);
      window.addEventListener("resize",function(){
        _this.echartsObjList[id].resize();
      });
    },
    getEcharts () {
      this.tableloading = true;
      this.$http.post('/echarts',{
        area: 1,
      }).then((response)=>{
        console.log(response);
        this.option.xAxis.data = response.xAxis;
        this.option.series[0].data = response.yAxis;
        this.showEcharts('echarts-bx', this.option);
        this.loading = false;
      }).catch((error)=>{
        console.log(error);
        this.loading = false;
      })
    }
  },
  filters: {

  }
}
