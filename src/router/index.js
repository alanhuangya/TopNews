import {createRouter, createWebHashHistory} from 'vue-router';
import AdminIndex from '@/pages/admin/index.vue';
import About from '@/pages/about.vue';
import NotFound from '@/pages/404.vue';
import AdminLogin from '@/pages/admin/login.vue';
import Admin from '@/layouts/admin.vue'
import AdminArticleList from '@/pages/admin/article-list.vue'
import AdminCategoryList from '@/pages/admin/category-list.vue'
import AdminTagList from '@/pages/admin/tag-list.vue'
import AdminBlogSetting from '@/pages/admin/blog-setting.vue'
import Index from '@/pages/frontend/index.vue'
import ArticleDetail from '@/pages/frontend/article-detail.vue'
import CategoryList from '@/pages/frontend/category-list.vue'
import TagList from '@/pages/frontend/tag-list.vue'
import CategoryArticleList from '@/pages/frontend/category-article-list.vue'
import TagArticleList from '@/pages/frontend/tag-article-list.vue'
import ArchiveList from '@/pages/frontend/archive-list.vue'
// import { Search } from '@element-plus/icons-vue/dist/types';
import SearchNews from '@/pages/frontend/search-news.vue'
import NewsStatistics from '@/pages/frontend/news-statistics.vue'
import store from "@/store";

const routes = [
    {
        // 将主页面设置为默认路由
        path: '/',
        component: Index,
        meta: {
            title: 'TopNews首页'
        }
    },
    {
        path: '/news/detail',
        component: ArticleDetail,
        meta: {
            title: '文章详情页'
        },
    },
    {
        path: '/news/statistics',
        component: NewsStatistics,
        meta: {
            title: '统计'
        },
    },
    {
        path: '/news/search',
        component: SearchNews,
        meta: {
            title: '新闻搜索页'
        },
    },
    // {
    //     path: '/article/detail',
    //     component: ArticleDetail,
    //     meta: {
    //         title: '文章详情页'
    //     },
    // },
    {
        path: '/category',
        component: CategoryList,
        meta: {
            title: '分类'
        },
    },
    {
        path: '/tag',
        component: TagList,
        meta: {
            title: '标签'
        },
    },
    {
        path: '/category/list',
        component: CategoryArticleList,
        meta: {
            title: '分类文章列表'
        },
    },
    {
        path: '/tag/list',
        component: TagArticleList,
        meta: {
            title: '标签文章列表'
        },
    },
    {
        path: '/archive',
        component: ArchiveList,
        meta: {
            title: '归档'
        },
    },
    {
        path: '/admin',
        component: Admin,
        children: [{
            path: '/admin',
            component: AdminIndex,
            meta: {
                title: '仪表盘'
            }
        }, {
            path: '/admin/article/list',
            component: AdminArticleList,
            meta: {
                title: '文章管理'
            }
        }, {
            path: '/admin/category/list',
            component: AdminCategoryList,
            meta: {
                title: '分类管理'
            }
        }, {
            path: '/admin/tag/list',
            component: AdminTagList,
            meta: {
                title: '标签管理'
            }
        }, {
            path: '/admin/blog/setting',
            component: AdminBlogSetting,
            meta: {
                title: '博客设置'
            }
        }]
    },
    {
        path: '/about',
        component: About
    },
    // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
]

// ...


const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

// 导航守卫
router.beforeEach((to, from, next) => {
    console.log('t===================');
    // 在切换路由前保存状态
    store.commit('SAVE_STATE'); // 自定义 mutation 来保存状态
    console.log(store.state.isCN);
    next();
});

router.afterEach((to, from) => {
    // 在切换路由后恢复状态
    store.commit('RESTORE_STATE'); // 自定义 mutation 来恢复状态
    console.log("保存的isCN状态为：" + store.state.isCN);
});

// ES6 模块导出语句，它用于将 router 对象导出，以便其他文件可以导入和使用这个对象
export default router