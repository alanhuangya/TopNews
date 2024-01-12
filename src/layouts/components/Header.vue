<!-- 自己修改的 -->
<template>
  <header class="sticky top-0 z-100">

    <nav class="bg-white border-gray-200 border-b dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <!-- 图标 -->
        <a href="/" class="flex items-center">
          <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo"/>
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{{
              新闻小助手
            }}</span>
        </a>
        <!-- 分类 -->
        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
          <ul
              class="cursor-pointer flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li v-for="(type) in store.state.isCN ? zh.header.types : jp.header.types" :key="type">
              <a @click="changeType(type)" :class="[currType == type ? 'text-blue-700' : 'text-gray-900']"
                 class="block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 md:dark:text-blue-500"
                 aria-current="page">
                {{ type }}
              </a>
            </li>
          </ul>
        </div>

        <!-- 搜索加头像 -->
        <div class="flex items-center md:order-2">
          <div class="flex mr-3">
            <!-- 深色模式 -->
            <button class="ml-1 mr-4 vt-switch vt-switch-appearance" type="button" role="switch"
                    aria-label="切换深色模式" aria-checked="false">
                            <span class="vt-switch-check">
                                <span class="vt-switch-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"
                                         class="block vt-switch-appearance-sun" viewBox="0 0 24 24">
                                        <path
                                            d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"
                                            data-v-b7bb03ab=""></path>
                                        <path
                                            d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"
                                            data-v-b7bb03ab=""></path>
                                        <path
                                            d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"
                                            data-v-b7bb03ab=""></path>
                                        <path
                                            d="M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z"
                                            data-v-b7bb03ab=""></path>
                                        <path
                                            d="M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z"
                                            data-v-b7bb03ab=""></path>
                                        <path d="M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"
                                              data-v-b7bb03ab=""></path>
                                        <path d="M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                                              data-v-b7bb03ab=""></path>
                                        <path
                                            d="M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z"
                                            data-v-b7bb03ab=""></path>
                                        <path
                                            d="M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z"
                                            data-v-b7bb03ab=""></path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"
                                         class="hidden vt-switch-appearance-moon" viewBox="0 0 24 24">
                                        <path data-v-b7bb03ab=""
                                              d="M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z">
                                        </path>
                                    </svg>
                                </span>
                            </span>
            </button>
            <!-- 搜索 -->
            <div class="relative hidden md:block">
              <div @click="searchNews(searchInput)"
                   class="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span class="sr-only">Search icon</span>
              </div>
              <input type="text" id="search-navbar" v-model="searchInput"
                     class="block w-70 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     :placeholder="store.state.isCN? zh.header.placeholder:jp.header.placeholder"
              @keyup.enter="searchNews(searchInput)">
            </div>
            <div>
              <component :is="store.state.isCN ? ZhIcon : JpIcon" @click="changeLanguage"></component>
            </div>
          </div>
        </div>

      </div>
    </nav>
  </header>
</template>

<script setup>
import {useStore} from 'vuex'
import {useRouter} from 'vue-router';
import {ref, markRaw} from 'vue';
import {showModel, showMessage} from '@/composables/util'
import {onMounted} from 'vue'
import {initDropdowns, initCollapses, initModals} from 'flowbite'
import ZhIcon from "@/layouts/components/ZhIcon.vue";
import JpIcon from "@/layouts/components/JpIcon.vue";
import {useI18n} from 'vue-i18n'
import zh from '@/components/language/zh.js'
import jp from '@/components/language/jp.js'
import {getCurrentInstance} from 'vue';

// initialize components based on data attribute selectors
onMounted(() => {
  initCollapses();
  initDropdowns();
  initModals();
})

const store = useStore()
const route = useRouter()
console.log('=========================')
console.log(store.state.isCN)


const currPath = ref(route.path)

const i18n = useI18n()


console.log(store.state.user)
// const keys = Object.keys(store.state.user)
// console.log('====== keys')
// console.log(keys)
// const isLogin = ref(keys.length > 0)
// let currType = '生活'
let currType = route.currentRoute.value.query.type
//搜索的文本框
let searchInput = ''
// 定义 props
const props = defineProps(['onTypeChanged', 'onSearchNews']);

store.commit('SET_IS_ZH', true);


// let currentIcon = (store.state.isCN ? ref(markRaw(ZhIcon)) : ref(markRaw(JpIcon)))

function changeLanguage() {
  console.log('切换语言');
  // console.log(currentIcon.value);

  // currentIcon.value = (store.state.isCN ? markRaw(JpIcon) : markRaw(ZhIcon))
  //
  // if (currentIcon.value.name === 'ZhIcon') {
  //   currentIcon.value = markRaw(JpIcon);
  // } else {
  //   currentIcon.value = markRaw(ZhIcon);
  // }
  store.commit('SET_IS_ZH', !store.state.isCN);

}

//类型改变事件
function changeType(type) {
  currType = type
  console.log('当前的type' + currType);
  // 调用父组件传递的处理函数
  props.onTypeChanged(type);
  route.push({path: '/', query: {type: type}})  //修改路由
}

function searchNews(input) {
  console.log(input);
  // 调用父组件传递的处理函数
  props.onSearchNews(input);
  route.push({path: '/news/search', query: {search: input}})  //修改路由
}

</script>

<style scoped>
.container {
  max-width: 1260px;
}

.header-container {
  border-bottom: solid 1px var(--el-menu-border-color);
}

.el-menu--horizontal {
  border-bottom: 0;
}

.el-menu {
  /* max-width: 1260px; */
  height: 55px;
}

.el-header {
  border-bottom: 1px solid #dcdfe6;;
  height: 55px;
}

.navbar-wrapper {
  height: 55px;
}

.logo-img {
  height: 40px;
}

.logo-container {
  /* display: flex;
  align-items: center; */
}

.logo-container > a {
  height: 28px;
  width: 128px;
}

.title {
  font-size: 1.6rem;
  font-weight: 800;
}

.title-li:hover {
  border-bottom: 1px solid #fff !important;
}

/* body {
    @apply bg-light-50;
} */

.bg-gray-hover:hover {
  border-bottom: 1px solid #fff !important;
  background-color: #f4f4f5 !important;
}
</style>