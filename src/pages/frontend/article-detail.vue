<!-- 自己修改的 -->
<template>
  <Header @typeChanged="handleTypeChange" @searchNews="handleSearchChange"></Header>

  <!-- 文章详情 -->
  <div class="container mx-auto max-w-screen-xl mt-5 mb-3">
    <div class="grid grid-cols-4">
      <!-- 左边栏 -->
      <div class="col-span-4 px-3 mb-3 md:col-span-3 sm:col-span-4">
        <div class="bg-white border border-gray-200 p-5 rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <!-- 面包屑 -->
          <!-- 首页/正文 -->
          <nav class="flex mb-4" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <a @click=goNewsHomePage()
                   class="cursor-pointer inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                  <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                       fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                  </svg>
                  {{ store.state.isCN ? news.type.CN : news.type.JP }}
                </a>
              </li>
              <li aria-current="page">
                <div class="flex items-center text-gray-400">
                  /
                  <span
                      class="ml-1 text-sm font-medium text-gray-500 md:ml-4 dark:text-gray-400">{{
                      store.state.isCN ? Zh.content : Jp.content
                    }}</span>
                </div>
              </li>
            </ol>
          </nav>
          <!-- 文章主体 -->
          <article>
            <!-- 文章标题 -->
            <h1 class="title mt-2">{{ store.state.isCN ? news.titleCN : news.titleJP }}</h1>
            <!-- 发布时间 -->
            <div class="text-gray-400 text-sm flex items-center article-mata">
              <svg class="inline w-3 h-3 mr-2 text-gray-400 dark:text-white" aria-hidden="true"
                   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/>
              </svg>
              {{ news.date }}
            </div>
            <!-- 内容 -->
            <div class="article-content" v-viewer v-html="store.state.isCN?news.contentCN:news.contentJP" v-highlight>
            </div>

            <!-- 标签 -->
            <div class="mt-5 mb-5">
              <div
                  class="inline-block rounded-full bg-blue-100 text-blue-800 text-sm font-medium mr-3 mb-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 hover:bg-green-200 hover:text-green-900">
                # {{ store.state.isCN ? types.CN : types.JP }}
              </div>
            </div>
          </article>
        </div>
        <MoreNews :type="news.type" @newsChanged="handleNewsChange(news)"></MoreNews>
      </div>
      <!-- 右边栏 -->
      <el-card class="sticky top-21" style="margin-left:10px;border-radius: 15px;width:380px;height:600px;">
        <div>{{ store.state.isCN ? Zh.ai : Jp.ai }}</div>
          <div class="chatAppBody">
            <div class="chatBox" id="chat">
              <div v-for="(message, index) in messages" :key="index"
                   :class="message.isMe ? 'chatRow chatRowMe' : 'chatRow'">
                <el-avatar v-if="!message.isMe" class="chatAvatar" :size="30"
                           src="https://goflychat.oss-cn-hangzhou.aliyuncs.com/static/upload/avator/2022June/32a988a3c2f8700119fa1f5da1b6a4bd.png"></el-avatar>
                <div v-if="!message.isMe" class="chatMsgContent">
                  <div class="chatContent">{{ message.content }}</div>
                </div>
                <div v-if="message.isMe" class="chatContentMy"
                     :ref="index === messages.length - 1 ? 'lastMessage' : ''">{{ message.content }}
                </div> <!-- 显示用户的问题 -->
                <el-avatar  v-if="message.isMe" class="chatAvatar" :size="30"
                           src="https://goflychat.oss-cn-hangzhou.aliyuncs.com/static/upload/avator/2022June/32a988a3c2f8700119fa1f5da1b6a4bd.png"></el-avatar>

              </div>
            </div>
          </div>
        <el-row style="display: flex; align-items: center; min-height: 100%;">
          <el-col :span="18">
            <el-input
                v-model="myInput"
                :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea"
                placeholder="Please input"
                @keyup.enter="sendMessage"/>
          </el-col>
          <el-col :span="6" :style="{ display: 'flex', justifyContent: 'flex-end' }">
            <svg t="1703841522329" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="9836" width="40" height="40" @click="sendMessage">
              <path
                  d="M513.792 509.3888m-456.8576 0a456.8576 456.8576 0 1 0 913.7152 0 456.8576 456.8576 0 1 0-913.7152 0Z"
                  fill="#529FF4" p-id="9837" data-spm-anchor-id="a313x.search_index.0.i0.f9d53a815w2nh6"
                  class="selected"></path>
              <path
                  d="M762.88 322.0992a46.08 46.08 0 0 0-45.056-16.1792L224.8192 405.1456a46.08 46.08 0 0 0-15.6672 84.4288l199.3216 126.5152 79.0016 209.152a46.08 46.08 0 0 0 42.24 29.9008h1.0752a46.08 46.08 0 0 0 42.496-28.0064l196.4032-457.6256a46.08 46.08 0 0 0-6.8096-47.4112z m-532.0192 133.12a5.12 5.12 0 0 1 2.048-9.7792l462.1824-92.9792L424.96 577.9456z m304.5888 355.9936a5.12 5.12 0 0 1-5.12 3.2256 5.12 5.12 0 0 1-5.12-3.4304L450.048 610.2528l267.6736-223.488z"
                  fill="#FFFFFF" p-id="9838"></path>
            </svg>
          </el-col>
        </el-row>


      </el-card>

    </div>
  </div>
  <Footer></Footer>
  <el-backtop :right="30" :bottom="80"/>
</template>

<script>
import {ref} from "vue";
import {getAI} from "@/api/frontend/news";
import {useRoute, useRouter} from "vue-router";
export default {
  data() {
    return {
      myInput: '',
      messages: [],
    };
  },
  created() {
    this.messages = [
      {
        content: '你好，我是小助手，有什么可以帮到你的吗？',
        isMe: false,
      },
    ];
  },
  methods: {
    sendMessage() {
      // 获取当前路由
      let id = this.$route.query.id;
      let date = this.$route.query.date;
      let type = this.$route.query.type;
      // 获取用户的问题
      const question = this.myInput.trim();
      console.log(question)
      if (question !== '') {
        // 添加用户的问题到聊天记录中
        this.messages.push({content: question, isMe: true});

        // 获取回答
        this.getAnswerFromBackend(question,id,type,date).then(message => {
          // 更新最后一条消息之后的内容
          let answer = {content: message, isMe: false};
          this.updateChatContent(answer);
        });

        // 清空输入框
        this.myInput = '';
      }
    },
    getAnswerFromBackend(question,id,type,date) {
      return new Promise((resolve, reject) => {
        getAI({
          q: question,
          id: id,
          type: type,
          date: date
        }).then(res => {
          resolve(res.data);
        });
      });
    },
    updateChatContent(answer) {
      this.messages.push(answer);
      setTimeout(()=>{
        // let chat = this.$el.querySelector("#chat")
        let chat = document.getElementById("chat")
        chat.scrollTop = chat.scrollHeight
      },20)
    },
  }
}
</script>

<script setup>
import Header from '@/layouts/components/Header.vue'
import Footer from '@/layouts/components/Footer.vue'
import MoreNews from '@/components/MoreNews.vue'
import HotNewsList from '@/components/HotNewsList.vue'
import {useRoute, useRouter} from 'vue-router';
import {getArticleDetail} from '@/api/frontend/article';
import {useStore} from 'vuex'
import {ref, reactive, watch} from 'vue'
import {getNewsDetail} from "@/api/frontend/news";
import Jp from "../../components/language/jp";
import Zh from "../../components/language/zh";
import config from "../../config";

const textarea = ref('')
const store = useStore()
const router = useRouter()
const route = useRoute()
let textList = ref([])
// const article = reactive({
//     title: '',
//     content: '',
//     updateTime: '',
//     readNum: 0,
//     categoryId: null,
//     categoryName: '',
//     preArticleId: null,
//     preArticleTitle: '',
//     nextArticleId: null,
//     nextArticleTitle: '',
//     tags: [],
// })

let news = ref(null);
let types = ref(null);

// 获取新闻详情
function queryNewsDetail(id, type, date) {
  console.log('调用获取详情接口...' + route.query.id)
  console.log('调用获取详情接口...' + route.query.type)
  console.log('调用获取详情接口...' + route.query.date)
  getNewsDetail({
    id: id,
    type: type,
    date: date
  }).then((res) => {
    news.value = res.data
    types = config.getType(res.data.type)
  })
}

watch(news, () => {
  // console.log('news changed', newVal, oldVal)
})


queryNewsDetail(route.query.id, route.query.type,route.query.date);

// 处理类型改变事件
function handleTypeChange(type) {
  console.log('handleTypeChange' + type);
}

function handleNewsChange(news) {
  let date = news.date.split(' ')[0]
  queryNewsDetail(news.id, news.type,date);
}

function handleSearchChange(input) {
  console.log('handleNewsSearch' + input);
}


// const goArticleDetail = (articleId) => {
//     console.log('跳转详情页' + articleId)
//     router.push({ path: '/article/detail', query: { articleId: articleId } })
//     queryArticleDetail(articleId)
// }

function goNewsHomePage() {
  router.push({path: '/', query: {type: store.state.isCN ? news.value.type.CN : news.value.type.JP}})  //修改路由
}

function getList() {
  const arr = '用户1：嘻嘻嘻嘻嘻。用户2： 你好'.split('\n')
  const arr1 = []
  const nameArr = []
  arr.forEach(i => {
    const list = i.split(':')
    // 找出有几个人-需求只有两个人-因为我们的项目是这样出参的
    if (nameArr.indexOf(list[0]) === -1) {
      nameArr.push(list[0])
    }
  })
  arr.map(item => {
    if (item.indexOf(nameArr[0]) > -1) {
      arr1.push({
        name: nameArr[0],
        content: item.slice(4),
        position: 'left' // 设置是左边框还是右边框
      })
    } else if (item.indexOf(nameArr[1]) > -1) {
      arr1.push({
        name: nameArr[1],
        content: item.slice(4),
        position: 'right'
      })
    }
  })
  textList = arr1
}

getList();

</script>

<style scoped>
.title {
  padding-bottom: 20px;
  margin-bottom: 0;
  line-height: 1.3;
  word-wrap: break-word;
  font-size: 32px;
  font-weight: 700;
  color: #292525;
}


.article-mata {
  margin-bottom: 20px;
}

:deep(pre) {
  background: #21252b;
  color: #f8f8f2;
  border-radius: 5px;
  padding: 10px 0 0;
  font-size: 17px;
  padding-left: 15px;
}

:deep(pre code.hljs) {
  display: block;
  overflow-x: auto;
  padding: 1em;
  padding-left: 0 !important;
  padding-top: 25px !important;
}

:deep(pre:before) {
  background: #fc625d;
  border-radius: 50%;
  box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
  content: ' ';
  height: 10px;
  margin-top: 5px;
  position: absolute;
  width: 10px;
}

:deep(.article-content p) {
  letter-spacing: 0.3px;
  margin: 0 0 20px 0;
  line-height: 30px;
  color: #4c4e4d;
  font-weight: 400;
  word-break: normal;
  word-wrap: break-word;
  font-family: -apple-system, BlinkMacSystemFont, PingFang SC, Hiragino Sans GB, Microsoft Yahei, Arial, sans-serif;
}

:deep(.article-content h1, .article-content h2, .article-content h3, .article-content h4, .article-content h5, .article-content h6) {
  margin: 30px 0 10px 0;
  color: #292525;
  line-height: 150%;
  font-family: PingFang SC, Helvetica Neue, Helvetica, Hiragino Sans GB, Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
}

:deep(.article-content h3) {
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: 16px;
  font-weight: 600;
}

:deep(.image-caption) {
  min-width: 20%;
  max-width: 80%;
  min-height: 43px;
  display: block;
  padding: 10px;
  margin: 0 auto;
  /* border-bottom: 1px solid #eee; */
  font-size: 13px;
  color: #999;
  text-align: center;
}

:deep(code:not(pre code)) {
  padding: 2px 4px;
  margin: 0 2px;
  font-size: 95% !important;
  border-radius: 4px;
  color: rgb(41, 128, 185);
  background-color: rgba(27, 31, 35, 0.05);
  font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
}

:deep(pre code) {
  display: block;
  font-size: 95% !important;
  background-color: rgba(27, 31, 35, 0.05);
  font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
  /* color: #fff; */
}

:deep(article ul) {
  padding-left: 40px;
}

p {
  color: red;
}

:deep(article ul li) {
  list-style-type: disc;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 16px;
}


:deep(blockquote) {
  /* margin: 20px 0; */
  border-left: 2.3px solid rgb(52, 152, 219);
  quotes: none;
  background: rgb(236, 240, 241);
  color: #777;
  font-size: 16px;
  /* padding: 10px 15px 10px 15px; */
  margin: 2em 0;
  padding: 24px 24px;
  position: relative;
}

:deep(blockquote p:last-child) {
  margin-bottom: 0;
}

:deep(table tr) {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}

:deep(table) {
  border-collapse: collapse;
  margin-bottom: 1rem;
}

:deep(table th) {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

:deep(table td) {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

:deep(.article-content a) {
  color: #167bc2;
}

:deep(.article-content h2) {
  /* margin: 1em auto; */
  font-size: 22px;
  line-height: 1.5;
  font-weight: bold;
  font-synthesis: style;
  /* border-bottom: 1px solid rgba(0,0,0,.1); */
  padding-bottom: 16px;
  /* border-left: 3px solid #167bc2; */
  padding-bottom: 0;
  font-size: 24px;
  margin-top: 40px;
  margin-bottom: 26px;
  line-height: 140%;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 15px;
}

:deep(.article-content svg) {
  display: inline;
}

:deep(.article-content img) {
  position: relative;
  max-width: 100%;
  overflow: hidden;
  display: block;
  margin: 0 auto;
  /*cursor: -webkit-zoom-in;*/
  cursor: zoom-in;
}

:deep(strong) {
  color: rgb(52, 152, 219);
}

:deep(table tr:nth-child(2n)) {
  background-color: #f6f8fa;
}

.el-breadcrumb__inner a {
  font-weight: 400;
  color: #606266;
}

.el-breadcrumb__inner a:hover {
  font-weight: 400;
  color: #606266;
  text-decoration: underline;
}

.article-footer {
  border-top: 1px solid #e4e7ed;
  background-color: var(--el-fill-color-blank);
  justify-content: space-between;
  padding-top: 1rem;
}

.desc {
  display: block;
  font-size: 12px;
  color: rgba(60, 60, 60, .7);;
}

.cursor-pointer {
  cursor: pointer;
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

/**/
.dialog-text-box {
  height: 500px;
  overflow: auto;
  background-color: #F2F2F2;
}

.dialog-text-box::-webkit-scrollbar {
  display: none;
}

.text-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.text-item:last-child {
  margin-bottom: 0;
}

.chat-name {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-radius: 50%;
  background-color: #3C8AFF;
  color: #Ffffff;
}

.chat-box {
  margin-left: 12px;
  padding: 8px;
  max-width: calc(100% - 55px);
  background: #FFFFFF;
  position: relative;
  border-radius: 4px;
}

.chat-box:before {
  content: "";
  position: absolute;
  right: 100%;
  top: 50%;
  width: 0;
  height: 0;
  border-top: 9px solid transparent;
  border-right: 8px solid #FFFFFF;
  border-bottom: 9px solid transparent;
  transform: translateY(-50%);
}

.text-item-right {
  justify-content: flex-end;
}

.text-item-right .chat-box {
  margin-left: 0;
  margin-right: 15px;
}

.text-item-right .chat-box:before {
  right: -8px;
  border-left: 8px solid #FFFFFF;
  border-right: none;
}
</style>

<style lang="scss">
.chatAppBody {
  height: 480px;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.chatTitle {
  background: #fff;
}

.chatBox {
  flex: 1;
  //padding: 0 5px;
}

.chatBottom {
  background: #fff;
}

.chatRow {
  display: flex;
  align-items: flex-end;
  margin: 5px 0px;
}

.chatAvatar {
  margin-right: 5px;
  flex-shrink: 0;
}

.chatUsername {
  font-size: 12px;
  white-space: nowrap;
  color: #999;
  margin-bottom: 2px;
}

.chatContent {
  max-width: 220px;
  border-radius: 10px 10px 10px 0px;
  padding: 10px;
  background-color: rgb(237, 237, 238);
  box-shadow: 0 5px 30px rgb(50 50 93 / 8%), 0 1px 3px rgb(0 0 0 / 5%);
  font-size: 14px;
  word-break: break-all;
  line-height: 21px;
  margin-bottom: 5px;
  margin-top: 5px;
}

.chatContentMy {
  //设置最大宽度为父元素宽度的80%
  max-width: 75%;
  border-radius: 10px 10px 10px 0px;
  padding: 10px;
  background-color: rgb(242, 248, 255);
  box-shadow: 0 5px 30px rgb(50 50 93 / 8%), 0 1px 3px rgb(0 0 0 / 5%);
  font-size: 14px;
  //设置字体颜色
  color: #409eff;
  word-break: break-all;
  line-height: 21px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.chatRowMe {
  justify-content: flex-end;
}

.chatRowMe .chatContent {
  border-radius: 10px 10px 0px 10px;
}
</style>