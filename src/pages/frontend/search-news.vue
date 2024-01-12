<!-- 自己修改的 -->
<template>
  <!--  @typeChanged="handleTypeChange" -->
  <Header @typeChanged="handleTypeChange" @searchNews="handleSearchChange"></Header>
  <div class="container mx-auto max-w-screen-xl mt-5">
    <div class="grid grid-cols-4">
      <!-- 左边栏 -->
      <div class="col-span-4 px-3 md:col-span-4 sm:col-span-4">
        <!-- 搜索按钮 -->
        <div class="flex mr-3">
          <div class="relative hidden md:block">
            <a @click="getSearchNews(globalSearch)"
               class="cursor-pointer absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span class="sr-only">Search icon</span>
            </a>
            <input type="text" id="search-navbar" v-model="globalSearch"
                   class="block w-100 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   :placeholder="store.state.isCN? zh.header.placeholder:jp.header.placeholder"
                   @keyup.enter="getSearchNews(globalSearch)">
          </div>
        </div>
        <p class="mt-2 mb-2 text-xs text-gray-500 dark:text-gray-400">找到 {{ newsList.length }} 条结果
        </p>
        <!-- <h1 class="title mt-5">{{ globalType }}</h1> -->
        <!-- 文章列表 -->
        <!-- <div class="grid  gap-4 mt-5"> -->
        <div v-for="(news, index) in newsList" :key="index"
             class="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 mb-2">
          <div class="grid grid-cols-12">
            <!-- 图片两格 -->
            <div class="grid col-span-2">
              <a @click="goNewsDetail(news)" class="cursor-pointer">
                <img class="rounded-t-lg  w-40 h-44" :src="news.image"/>
              </a>
            </div>
            <!-- 内容9格 -->
            <div class="grid col-span-9">
              <div class="mt-5">
                <a @click="goNewsDetail(news)" class="cursor-pointer">
                                    <span class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                                          v-html="highlightText(store.state.isCN?news.titleCN:news.titleJP)">
                                    </span>
                </a>
                <span
                    class="mb-5 inline-block rounded-full bg-blue-100 text-blue-800 text-sm font-medium ml-3 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 hover:bg-green-200 hover:text-green-900">
                                    # {{ store.state.isCN?config.getType(news.type).CN:config.getType(news.type).JP }}
                                </span>
              </div>
              <p class="mb-2 font-normal text-gray-500 dark:text-gray-400"
                 v-html="highlightText(store.state.isCN?news.contentCN:news.contentJP)">
              </p>
              <p class="mb-2 text-gray-400 text-sm flex items-center article-mata">
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
      </div>

      <!-- </div> -->
    </div>
  </div>
  <Footer></Footer>
  <el-backtop :right="30" :bottom="80"/>
  <button class="statistics" >
    <span>统计</span>
  </button>
  <button class="show-form-button" @click="showSubscribeForm = !showSubscribeForm">
    <span>订阅</span>
  </button>
  <!-- <div class="floating-container"> -->
  <SubscribeNews v-model="showSubscribeForm" @submitForm="handleShowChange"></SubscribeNews>
</template>

<script setup>
import Header from '@/layouts/components/Header.vue'
import Footer from '@/layouts/components/Footer.vue'
import SubscribeNews from '@/components/SubscribeNews.vue'
import zh from "@/components/language/zh";
import jp from "@/components/language/jp";
import HotNewsList from '@/components/HotNewsList.vue'
import {useRouter} from 'vue-router'
import {h, reactive, ref} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import {searchNews} from '@/api/frontend/news'
import config from "@/config";
// import { getIndexArticles } from '@/api/frontend/index'  // 从后端获取首页文章列表

const route = useRouter()
const store = useStore()
let showSubscribeForm = ref(false)
let newsList = ref([])

let globalSearch = (route.currentRoute.value.query.search) ? (route.currentRoute.value.query.search) : "12345"

function highlightText(text) {
  if (typeof text === 'undefined') {
    return ""; // 或者您可以根据需要返回其他默认值
  }
  const searchKeyword = globalSearch; // 获取搜索关键字
  // 使用正则表达式替换匹配的关键字为带有高亮样式的文本
  const highlightedText = text.replace(new RegExp(searchKeyword, 'gi'), '<span class="text-blue-500">$&</span>');
  return highlightedText;
}

function goNewsDetail(news) {
  console.log('跳转详情页' + news.id);
  let date = news.date.split(' ')[0]
  route.push({path: '/news/detail', query: {id: news.id,type:news.type,date:date}})  //修改路由
}

function getSearchNews(search) {
  // 切换url
  route.push({path: '/news/search', query: {search: search}})  //修改路由
  globalSearch = search
  searchNews({keyword:search,type:1}).then(res => {
    console.log(res)
    if (res.code === 200) {
      newsList.value = res.data
    }
  })
  console.log(search);
  // 对newsList中的文本进行高亮处理
  newsList.value.forEach(news => {
    news.content = highlightText(news.content);
    // 如果您的新闻数据中还有其他需要高亮处理的字段，请相应地进行处理
  });
}

getSearchNews(globalSearch)

// 处理类型改变事件
function handleTypeChange(type) {
  console.log('handleTypeChange' + type);
}


function handleSearchChange(input) {
  console.log("handleSearchChange")
  // globalSearch = input
  console.log('search-news-handleSearchChange+' + input)
  getSearchNews(input)

}
</script>

<style>
.highlight {
  background-color: yellow;
}

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