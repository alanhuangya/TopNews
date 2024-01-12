<template>
  <!-- 文章列表 -->
  <h1 class="title mt-20">{{ store.state.isCN ? Zh.more : Jp.more }}</h1>
  <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">

    <div v-for="(news, index) in newsList" :key="index"
         class="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
      <a @click="goNewsDetail(news)" class="cursor-pointer">
        <img class="rounded-t-lg h-50 w-full" :src="news.image"/>
      </a>
      <div class="p-5">
        <a @click="goNewsDetail(news)" class="cursor-pointer">
          <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{
              store.state.isCN ? news.titleCN : news.titleJP
            }}</h2>
        </a>
        <!-- <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">{{ article.description }}</p> -->
        <!-- meta 信息 -->
        <p class="text-gray-400 text-sm flex items-center article-mata">
          <svg class="inline w-3 h-3 mr-2 text-gray-400 dark:text-white" aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/>
          </svg>
          {{ news.date }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {h, reactive, ref} from 'vue'
import {useStore} from "vuex";
import Zh from "./language/zh";
import Jp from "./language/jp";
import {getMoreLike} from "@/api/frontend/news";
// import { getIndexArticles } from '@/api/frontend/index'  // 从后端获取首页文章列表
import config from "@/config";
const route = useRouter()
const store = useStore()
// 接收从父组件传递的 type 属性
const props = defineProps(['type', 'onNewsChanged']);
let newsList = ref([])
// // 跳转到文章详情页
// const goNewsDetail = (newsId) => {
//     console.log('跳转详情页' + newsId)
//     router.push({ path: '/news/detail', query: { id: newsId } })  //修改路由
// }

// const props1 = defineProps(['onNewsChanged']);
function goNewsDetail(news) {
  props.onNewsChanged(news);
  let date = news.date.split(' ')[0]
  route.push({path: '/news/detail', query: {id: news.id,type:news.type,date:date}})  //修改路由
}

function getMoreRelated(type) {
  getMoreLike({
    type: type
  }).then((res) => {
    console.log(res)
    if (res.code == 200) {
      newsList.value = res.data
    }
  })
}

console.log("hahhahahahahhahahahahh::::"+props.type)
getMoreRelated(props.type)
</script>

<style>
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