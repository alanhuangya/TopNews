<template>
  <div class="echarts-box">
    <div id="myEcharts" :style="{ width: this.width, height: this.height }"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {onMounted, onUnmounted} from "vue";

export default {
  name: "App",
  props: ["width", "height"],
  setup() {
    let myEcharts = echarts;

    onMounted(() => {
      initChart();
    });

    onUnmounted(() => {
      myEcharts.dispose;
    });

    function initChart() {
      let bgColor = '#fff';
      let title = '总共';
      let color =['#c065e7','#765deb','#3862d8','#6a89E2','#219CF9','#6efbbf','#40c057','#ffd351','#ff8e43','#f56b6d'];
      let echartData = [{
        name: "生活",
        value: "3720"
      },
        {
          name: "国内",
          value: "2920"
        },
        {
          name: "国际",
          value: "2200"
        },
        {
          name: "娱乐",
          value: "1420"
        },
        {
          name: "体育",
          value: "3200"
        },
        {
          name: "经济",
          value: "2420"
        },
        {
          name: "IT",
          value: "2200"
        },
        {
          name: "科技",
          value: "1420"
        },
        {
          name: "地域",
          value: "3200"
        }
      ];

      let formatNumber = function(num) {
        let reg = /(?=(\B)(\d{3})+$)/g;
        return num.toString().replace(reg, ',');
      }
      let total = echartData.reduce((a, b) => {
        return a + b.value * 1
      }, 0);

      let option = {
        backgroundColor: bgColor,
        color: color,
        tooltip: {
          trigger: 'item'
        },
        title: [{
          text: '{name|' + title + '}\n{val|' + formatNumber(total) + '}',
          top: 'center',
          left: 'center',
          textStyle: {
            rich: {
              name: {
                fontSize: 10,
                fontWeight: 'normal',
                color: '#000',
                padding: [10, 0]
              },
              val: {
                fontSize: 15,
                fontWeight: 'bolder',
                color: '#000',
              }
            }
          }
        },{
          text: '单位：个',
          top: 20,
          left: 20,
          textStyle: {
            fontSize: 14,
            color:'#666666',
            fontWeight: 300
          },
          show: false
        }],
        series: [{
          type: 'pie',
          roseType: 'radius',
          radius: ['15%', '50%'],
          center: ['50%', '50%'],
          data: echartData,
          hoverAnimation: false,
          itemStyle: {
            normal: {
              borderColor: bgColor,
              borderWidth: 2
            }
          },
          labelLine: {
            normal: {
              length: 20,
              length2: 70,
              lineStyle: {
                // color: '#e6e6e6'
              }
            }
          },
          label: {
            normal: {
              formatter: params => {
                return (
                    '{icon|●}{name|' + params.name + '}\n{value|' +
                    formatNumber(params.value) + '}'
                );
              },
              // padding: [0 , -100, 25, -100],
              rich: {
                icon: {
                  fontSize: 16,
                  color: 'inherit'
                },
                name: {
                  fontSize: 18,
                  padding: [0, 0, 0, 10],
                  color: '#000'
                },
                value: {
                  fontSize: 14,
                  fontWeight: 'bolder',
                  padding: [10, 0, 0, 20],
                  color: 'inherit'
                  // color: '#333333'
                }
              }
            }
          },
        }]
      };
      let chart1 = myEcharts.init(document.getElementById("myEcharts"));
      chart1.setOption(option);


    }

    return {
      initChart
    };
  }
};
</script>

