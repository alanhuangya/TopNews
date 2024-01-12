<template>
  <!-- col-span-4 px-3 md:col-span-1 sm:col-span-4 -->
  <div class="p-5 mb-4 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
    <div>
      <el-row>
        <el-col :span="17">
                    <span class="inline-flex items-center text-s font-medium text-gray-500 dark:text-gray-400">
                        <svg t="1703162407227" class="mr-3 icon" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="5764" width="20" height="20">
                            <path
                                d="M750.1 347.7l-71.9 70.4s0-281.6-239.6-375.5c0 0-24 258.1-143.8 352-119.7 93.9-359.3 375.5 119.9 586.7 0 0-239.6-258.1 71.9-445.9 0 0-24 93.9 95.8 187.7 119.8 93.9 0 258.1 0 258.1s575.1-140.7 167.7-633.5z"
                                fill="#d81e06" p-id="5765"></path>
                        </svg>
                        {{ store.state.isCN ? zh.sidebar.title : jp.sidebar.title }}
                    </span>
        </el-col>
        <el-col :span="7">
                    <span class="text-red-500 cursor-pointer" style="font-size: 15px;" @click="Refresh()">
                        <el-icon>
                            <Refresh/>
                        </el-icon>
                        {{store.state.isCN?zh.sidebar.exchange:jp.sidebar.exchange}}</span>
        </el-col>
      </el-row>

    </div>

    <ol class="mt">
      <li v-for="(item, index) in hotList" :key="index">
        <!-- 获取新闻详情的接口 -->
        <!-- class="cursor-pointer items-center block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700" -->
        <!-- @click="goNewsDetail(news.id)" -->
        <a @click="goNewsDetail(item)" class="cursor-pointer items-center block p-2 sm:flex">
          <div class="text-gray-600 dark:text-gray-400">
                        <span class="font-medium text-s mr-2" v-if="index === 0" :class="'text-red-800'"
                              style="font-family: 'Arial Black', sans-serif;">
                            {{ index + 1 }}
                        </span>
            <span class="font-medium text-s mr-2" v-else-if="index === 1" :class="'text-red-500'"
                  style="font-family: 'Arial Black', sans-serif;">
                            {{ index + 1 }}
                        </span>

            <span class="font-medium text-s mr-2" v-else-if="index === 2" :class="'text-yellow-500'"
                  style="font-family: 'Arial Black', sans-serif;">
                            {{ index + 1 }}
                        </span>

            <span class="font-medium text-s mr-2" v-else :class="'text-gray-400'"
                  style="font-family: 'Arial Black', sans-serif;">
                            {{ index + 1 }}
                        </span>
            <span
                class="inline-flex items-center text-s font-normal text-gray-1000 dark:text-gray-1000 hover:text-red-500">
                            {{ store.state.isCN ? item.titleCN : item.titleJP }}
                        </span>
          </div>
        </a>
      </li>
    </ol>
  </div>
</template>


<script setup>
import {useStore} from 'vuex'
import {initTooltips} from 'flowbite'
import {onMounted, watch} from 'vue'
import {useRouter} from 'vue-router'
import {ref} from 'vue'
import {getHotNews} from '@/api/frontend/news'
import zh from '@/components/language/zh.js'
import jp from '@/components/language/jp.js'
import {useI18n} from "vue-i18n";
import config from "@/config";
onMounted(() => {
  initTooltips();
})


// 接收从父组件传递的 type 属性
const props = defineProps(['type', 'onNewsChanged']);
console.log('Hotspot Type:', props.type.CN)
const store = useStore()
const router = useRouter()

// 在 type 变化时调用 getHotList 方法刷新热点新闻列表
watch(() => props.type, (newType) => {
  console.log('Hotspot Type changed:', newType.CN);
  console.log('Hotspot Type changed:', config.getIndex(newType.CN));
  getHotList(config.getIndex(newType.CN));
});
const hotList = ref([])

//
function goNewsDetail(news) {
  console.log('跳转详情页' + news.id);
  props.onNewsChanged(news.id);
  let date = news.date.split(' ')[0]
  router.push({path: '/news/detail', query: {id: news.id,type:news.type,date:date}})  //修改路由

}

// 获取热点新闻列表
// const type = ref()
function getHotList(type) {
  // console.log('获取热点新闻列表' + type)
  // if (type == '生活') {
  //     hotList.value = hotList1.value
  // } else {
  //     hotList.value = hotList2.value
  // }
  console.log('获取热点新闻列表')
  console.log(type)
  getHotNews({
    type: type
  }).then((res) => {
    console.log(res)
    if (res.code == 200) {
      hotList.value = res.data
    }
  })
}

getHotList(2)

function Refresh() {
  console.log('刷新')
  getHotList(config.getIndex(props.type.CN));
}

</script>