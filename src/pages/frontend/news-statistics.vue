<!-- 自己修改的 -->
<template>
  <!--  @typeChanged="handleTypeChange" -->
  <Header @typeChanged="handleTypeChange" @searchNews="handleSearchChange"></Header>
  <div class="container mx-auto max-w-screen-xl mt-5">
    <div class="grid grid-cols-1">
      <el-card>
        <div class="dataVisualize-box">
          <div class="card top-box">
            <div class="top-title">{{store.state.isCN? zh.statistics.title:jp.statistics.title}}</div>
<!--            <el-tabs v-model="tabActive" class="demo-tabs" @tab-click="handleTabClick">-->
<!--              <el-tab-pane v-for="item in tab" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>-->
<!--            </el-tabs>-->
            <div class="top-content">
              <el-row :gutter="40">
                <el-col class="mb40" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                  <div class="item-left sle">
                    <span class="left-title">总新闻发布数</span>
                    <div class="img-box">
                      <img src="./images/book-sum.png" alt=""/>
                    </div>
                    <span class="left-number">{{newsData.all}}</span>
                  </div>
                </el-col>
                <el-col class="mb40" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                  <div class="item-center">
                    <div class="gitee-traffic traffic-box">
                      <div class="traffic-img">
                        <img src="./images/add_person.png" alt=""/>
                      </div>
                      <span class="item-value">{{newsData.day}}</span>
                      <span class="traffic-name sle">日新闻发布数</span>
                    </div>
                    <div class="gitHub-traffic traffic-box">
                      <div class="traffic-img">
                        <img src="./images/add_team.png" alt=""/>
                      </div>
                      <span class="item-value">{{newsData.week}}</span>
                      <span class="traffic-name sle">周新闻发布数</span>
                    </div>
                    <div class="today-traffic traffic-box">
                      <div class="traffic-img">
                        <img src="./images/today.png" alt=""/>
                      </div>
                      <span class="item-value">IT</span>
                      <span class="traffic-name sle">访问最多的类别</span>
                    </div>
                    <div class="yesterday-traffic traffic-box">
                      <div class="traffic-img">
                        <img src="./images/book_sum.png" alt=""/>
                      </div>
                      <span class="item-value">地域</span>
                      <span class="traffic-name sle">访问最少的类别</span>
                    </div>
                  </div>
                </el-col>
                <el-col class="mb40" :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                  <div class="item-right">
                    <div class="echarts-title">统计</div>
                    <div class="book-echarts">
                      <bar-graph class="chart1" :width="'100%'" :height="'300px'"></bar-graph>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="card bottom-box">
            <div class="curve-echarts">
              <text-chart class="chart2" :width="'100%'" :height="'300px'" :id="tabActive"></text-chart>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
  <button class="statistics" @click="showStatistics">
    <span>统计</span>
  </button>
  <button class="show-form-button" @click="showSubscribeForm = !showSubscribeForm">
    <span>订阅</span>
  </button>
  <!-- <div class="floating-container"> -->
  <SubscribeNews v-model="showSubscribeForm" @submitForm="handleShowChange"></SubscribeNews>
</template>

<script setup>
import {useStore} from 'vuex'
import zh from '@/components/language/zh.js'
import jp from '@/components/language/jp.js'
const store = useStore()
</script>

<script>
import zh from '@/components/language/zh.js'
import jp from '@/components/language/jp.js'
import {useStore} from 'vuex'
import Header from '@/layouts/components/Header.vue'
import Footer from '@/layouts/components/Footer.vue'
import SubscribeNews from '@/components/SubscribeNews.vue'
import HotNewsList from '@/components/HotNewsList.vue'
import {useRouter} from 'vue-router'
import {reactive, ref} from 'vue'
import {getNewsByType} from "@/api/frontend/news";
import BarGraph from "../../layouts/components/BarGraph.vue";
import TextChart from "../../layouts/components/TextChart.vue";
import config from "@/config";
import {getNewsCount} from "@/api/frontend/news";
const store = useStore()

export default {
  components: {
    Header,
    Footer,
    SubscribeNews,
    HotNewsList,
    BarGraph,
    TextChart
  },
  data() {
    return {
      newsData:ref({
        all:100,
        day:1000,
        week:10000,
      }),
      zh,
      jp,
      tabActive: ref('1'),
      tab: [
        {label: "未来7日", name: 1},
        {label: "近七日", name: 2},
        {label: "近一月", name: 3},
        {label: "近三月", name: 4},
        {label: "近半年", name: 5},
        {label: "近一年", name: 6}
      ],
      showSubscribeForm: false,
      globalType: (this.$route.query.type) ? (this.$route.query.type) : '生活',
    };
  },
  created() {
    getNewsCount().then((res) => {
      if (res.code === 200) {
        this.newsData = res.data;
      }
    });
  },
  methods: {
    handleTabClick(tab) {
    },
    showStatistics() {
      console.log('显示统计数据');
      this.$router.push({path: '/news/statistics'});
    },

    // 获取分页数据
    getPage(currentNo) {
      console.log('获取分页数据');
      let type = config.getIndex(this.globalType.CN);
      getNewsByType({
        page: currentNo,
        size: this.size,
        type:type,
      }).then((res) => {
        if (res.code === 200) {
          this.newsList = res.data;
          this.total = this.size;
        }
      });
    },

    handleTypeChange(type) {
      console.log('index+handleTypeChange' + type);
      this.globalType = type;
      this.getPage(this.current);
    },

    handleShowChange() {
      console.log("handleshowchange");
      this.showSubscribeForm = false;
    },

    handleSearchChange(search) {
      console.log("handleSearchChange" + search);
      this.$router.push({path: '/news/search', query: {search: search}});
    },

    handleNewsChange(id) {
      console.log("handleNewsChange" + id);
      // this.$router.push({ path: '/news/detail', query: { id: id } });
    },
  },
};

</script>

<style>

.floating-container {
  background-color: #ffffff;
  position: fixed;
  top: 50px;
  /* 调整合适的数值，使其距离顶部的距离符合你的需求 */
  right: 20px;
  /* 调整合适的数值，使其距离右侧的距离符合你的需求 */
  z-index: 9999;
  /* 确保其层级高于其他内容 */
}

.statistics {
  position: fixed;
  right: 27px;
  bottom: 200px;
  z-index: 999;
  width: 50px;
  height: 50px;
  background-color: #0048ff;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}

.show-form-button {
  position: fixed;
  right: 27px;
  bottom: 132px;
  z-index: 999;
  width: 50px;
  height: 50px;
  background-color: #ff0000;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}

.show-form-button span {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  padding-bottom: 20px;
  margin-bottom: 0;
  line-height: 1.3;
  word-wrap: break-word;
  font-size: 32px;
  font-weight: 700;
  color: #292525;
}

.container {
  max-width: 1230px;
}

.article-img {
  height: 100%;
}

.two-line-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  outline: 0;
  color: var(--el-menu-text-color);;
  background-color: #fff;
  border-bottom: 2px solid #409eff;;
}

.category-item:hover {
  text-decoration: underline;
  cursor: pointer;
}

.tag-item:hover {
  cursor: pointer;
}

.el-tag:hover {
  background-color: var(--el-color-info-light-8);
}

.cursor-pointer {
  cursor: pointer;
}
</style>

<style scoped lang="scss">
@import "./index.scss";
</style>