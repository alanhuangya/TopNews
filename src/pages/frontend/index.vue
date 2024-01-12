<!-- 自己修改的 -->
<template>
  <!--  @typeChanged="handleTypeChange" -->
  <Header @typeChanged="handleTypeChange" @searchNews="handleSearchChange"></Header>
  <div class="container mx-auto max-w-screen-xl mt-5">
    <div class="grid grid-cols-4">
      <!-- 左边栏 -->

      <div class="col-span-4 px-3 md:col-span-3 sm:col-span-4">
        <h1 class="title mt-5">{{ store.state.isCN ?globalType.CN:globalType.JP}}</h1>
        <!-- 文章列表 -->
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 mt-5">

          <div v-for="(news, index) in newsList" :key="index"
               class="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <a @click="goNewsDetail(news)" class="cursor-pointer">
              <img class="rounded-t-lg h-50 w-full" :src="news.image">
            </a>
            <div class="p-5">
              <a @click="goNewsDetail(news)" class="cursor-pointer">
                <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {{store.state.isCN ? news.titleCN : news.titleJP}}
                </h2>
              </a>
              <!-- <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">{{ article.description }}</p> -->
              <!-- meta 信息 -->
              <p class="text-gray-400 text-sm flex items-center article-mata">
                <svg class="inline w-3 h-3 mr-2 text-gray-400 dark:text-white" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/>
                </svg>
                {{ news.date }}
              </p>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <nav aria-label="Page navigation example" v-if="total > 0">
          <ul class="flex items-center justify-center mt-10 mb-10 -space-x-px h-10 text-base">
            <!-- 向前一页 -->
            <li>
              <a v-if="current > 1" @click="getPage(current - 1)"
                 class="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span class="sr-only">Previous</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" d="M5 1 1 5l4 4"/>
                </svg>
              </a>
              <a v-else @click="getPage(current)"
                 class="cursor-not-allowed flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span class="sr-only">Previous</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" d="M5 1 1 5l4 4"/>
                </svg>
              </a>
            </li>
            <!-- 页码 -->
            <li v-for="index in totalPages" :key="index">
              <a @click="getPage(index)"
                 class="flex items-center border-gray-300 justify-center px-4 h-10 leading-tight bg-white border dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                 :class="[index == current ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700' : 'text-gray-500  hover:bg-gray-100 hover:text-gray-700']">

                {{ index }}
              </a>
            </li>
            <!-- 向后一页 -->
            <li>
              <a v-if="current < totalPages" @click="getPage(current + 1)"
                 class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span class="sr-only">Next</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
              </a>
              <a v-else="current == totalPages" @click="getPage(current)"
                 class="cursor-not-allowed flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span class="sr-only">Next</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
              </a>
            </li>
          </ul>
        </nav>


      </div>
      <!-- 右边栏 -->
      <div class="col-span-4 px-3 md:col-span-1 sm:col-span-4">
        <div class="sticky top-21">
          <HotNewsList :type="globalType" @newsChanged="handleNewsChange"></HotNewsList>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
  <el-backtop :right="30" :bottom="80"/>
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
import Header from '@/layouts/components/Header.vue'
import Footer from '@/layouts/components/Footer.vue'
import SubscribeNews from '@/components/SubscribeNews.vue'
import HotNewsList from '@/components/HotNewsList.vue'
import {useRouter} from 'vue-router'
import {h, reactive, ref} from 'vue'
import {getNewsByType} from "@/api/frontend/news";
import config from '@/config'
// import { getIndexArticles } from '@/api/frontend/index'  // 从后端获取首页文章列表
const store = useStore()
let showSubscribeForm = ref(false)
const route = useRouter()
let newsList = ref([])

let current = ref(1) //当前页码
const total = ref(180) //一共有多少条数据
const size = ref(18) //每页显示多少条
const totalPages = ref(Math.ceil(total.value / size.value)) //一共有多少页
let globalType = config.getType(config.getIndex((route.currentRoute.value.query.type) ? (route.currentRoute.value.query.type) : '生活'))
let index = config.getIndex(globalType)
let types = ref({})
types = config.getType(config.getIndex((route.currentRoute.value.query.type) ? (route.currentRoute.value.query.type) : '生活'))
console.log('types', types)

// // 跳转到文章详情页
// const goNewsDetail = (newsId) => {
//     console.log('跳转详情页' + newsId)
//     router.push({ path: '/news/detail', query: { id: newsId } })  //修改路由
// }

function showStatistics() {
  console.log('显示统计数据')
  route.push({path: '/news/statistics'})
}

function goNewsDetail(news) {
  console.log("sssssssssssssssssssssssssssssssssssssssssssssssssssssss")
  console.log("news", news);
  console.log('跳转详情页' + news.id);
  // 分割news.date，取空格前的日期
  let date = news.date.split(' ')[0]
  route.push({path: '/news/detail', query: {id: news.id,type:news.type,date:date}})  //修改路由
}

// 获取分页数据
function getPage(currentNo) {
  console.log('获取分页数据')
  let type = config.getIndex(globalType.CN)
  getNewsByType({
    page: currentNo,
    size: size.value,
    type: type
  }).then((res) => {
    if (res.code === 200) {
      newsList.value = res.data
      total.value = size.value
    }
  })
}

// getNewsList(current.value)
// function getPage(currentNo) {
//     console.log('获取分页数据')
//     current.value = currentNo
//     if (globalType == '生活') {
//         newsList.value = newsList1.value;
//     }
//     else {
//         newsList.value = newsList2.value
//     }
//     console.log(globalType);
//     // getPage({ current: currentNo, size: size.value, type: type.value })
//     //     .then((res) => {
//     //         console.log(res)
//     //         if (res.success == true) {
//     //             newsList.value = res.data
//     //             current.value = currentNo
//     //             total.value = res.total
//     //             // size.value = res.size
//     //             // pages.value = res.pages
//     //         }
//     //     })
// }
// 处理类型改变事件
function handleTypeChange(type) {
  console.log('index+handleTypeChange' + type);
  globalType = config.getType(config.getIndex(type))
  getPage(current.value);
}

getPage(current.value)

//
function handleShowChange() {
  console.log("handleshowchange")
  showSubscribeForm.value = false;
}

function handleSearchChange(search) {
  console.log("handleSearchChange" + search)
  route.push({path: '/news/search', query: {search: search}})  //修改路由
}

function handleNewsChange(id) {
  console.log("handleNewsChange" + id)
  // route.push({ path: '/news/detail', query: { id: id } })  //修改路由
}
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