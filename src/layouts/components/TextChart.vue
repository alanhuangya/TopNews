<template>
  <el-tabs v-model="tabActive" class="demo-tabs">
    <el-tab-pane v-for="item in tab" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
  </el-tabs>
  <div class="echarts-box1">
    <div id="myEcharts1" :style="{ width: this.width, height: this.height }"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {onMounted, onUnmounted, ref, watch} from "vue";

export default {
  name: "App123",
  props: ["width", "height"],
  setup() {
    let myEcharts1 = echarts;
    const chartIndex = ref(0);
    const tabActive = ref('1')
    const tab = ref([
      {label: "每日", name: 1},
      {label: "每周", name: 2},
      {label: "每月", name: 3},

    ])
    const chartData = ref([
      {
        key: ["2023-12-16","2023-12-17","2023-12-19","2023-12-21","2023-12-28","2023-12-29","2023-12-30","2023-12-31","2024-01-01","2024-01-02","2024-01-03","2024-01-04","2024-01-05","2024-01-06","2024-01-07","2024-01-08","2024-01-09","2024-01-10","2024-01-11","2024-01-12"],
        val: [{"name":"geo","type":"line","stack":"Total","data":[20,3,28,48,23,72,115,742,1192,757,850,1450,1522,920,831,1272,1637,1731,1662,602]},{"name":"recreation","type":"line","stack":"Total","data":[20,8,34,42,30,170,438,1618,1022,658,889,1150,1593,1127,1133,1230,1658,1824,1675,693]},{"name":"science","type":"line","stack":"Total","data":[20,9,20,40,20,20,21,10,85,89,125,74,76,5,47,4,39,45,15,4]},{"name":"economy","type":"line","stack":"Total","data":[20,2,23,41,21,45,65,327,314,207,371,473,519,357,273,252,513,613,598,364]},{"name":"it","type":"line","stack":"Total","data":[20,6,25,40,20,21,27,66,145,91,98,98,242,45,55,124,335,345,304,149]},{"name":"international","type":"line","stack":"Total","data":[20,5,20,40,20,44,38,115,177,199,272,252,270,159,132,201,295,354,309,172]},{"name":"physical","type":"line","stack":"Total","data":[20,7,20,42,27,181,363,1594,1339,998,1459,1470,1573,1596,1370,1443,1565,1484,1586,685]},{"name":"live","type":"line","stack":"Total","data":[20,1,20,41,27,94,219,533,488,358,510,511,539,494,504,450,589,663,654,325]},{"name":"interior","type":"line","stack":"Total","data":[20,4,20,41,23,57,51,239,729,528,485,607,583,414,338,393,531,596,572,253]}]
      },
      {
        key:["dayMap","weekMap","monthMap"],
        val:[{"name":"geo","type":"line","stack":"Total","data":[309,7433,7735]},{"name":"recreation","type":"line","stack":"Total","data":[742,8057,8213]},{"name":"science","type":"line","stack":"Total","data":[150,464,154]},{"name":"economy","type":"line","stack":"Total","data":[217,2568,2613]},{"name":"it","type":"line","stack":"Total","data":[159,785,1312]},{"name":"international","type":"line","stack":"Total","data":[187,1444,1463]},{"name":"physical","type":"line","stack":"Total","data":[660,10029,8133]},{"name":"live","type":"line","stack":"Total","data":[422,3433,3185]},{"name":"interior","type":"line","stack":"Total","data":[216,3585,2683]}]
      },
      {
        key: ["2023-12","2024-01"],
        val: [{"name":"geo","type":"line","stack":"Total","data":["2243","13234"]},{"name":"recreation","type":"line","stack":"Total","data":["3382","13630"]},{"name":"science","type":"line","stack":"Total","data":["245","523"]},{"name":"economy","type":"line","stack":"Total","data":["858","4540"]},{"name":"it","type":"line","stack":"Total","data":["370","1886"]},{"name":"international","type":"line","stack":"Total","data":["479","2615"]},{"name":"physical","type":"line","stack":"Total","data":["3593","15229"]},{"name":"live","type":"line","stack":"Total","data":["1443","5597"]},{"name":"interior","type":"line","stack":"Total","data":["1184","5300"]}]
      }
    ]);

    onMounted(() => {
      initChart();
    });

    onUnmounted(() => {
      myEcharts1.dispose;
    });

    watch(tabActive, () => initChart())

    function initChart() {
      let chart = myEcharts1.init(document.getElementById("myEcharts1"), "purple-passion");


      chart.setOption({
        title: {
          text: '折线图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: chartData.value[tabActive.value*1 - 1].key
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: chartData.value[tabActive.value*1 - 1].key
        },
        yAxis: {
          type: 'value'
        },
        series: chartData.value[tabActive.value*1 - 1].val
      });
      // window.onresize = function () {
      //   chart.resize();
      // };
    }

    return {
      initChart,
      tab,
      tabActive
    };
  }
};
</script>

