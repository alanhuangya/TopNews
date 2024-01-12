import { createStore } from 'vuex'
import { getAdminInfo } from '@/api/admin/user'
import { getBlogSettingDetail } from '@/api/frontend/blogsetting'
import { removeToken } from '@/composables/auth'
import { useRouter } from 'vue-router'
import createPersistedState from 'vuex-persistedstate';

const router = useRouter()
// 从 localStorage 中获取之前保存的状态
const savedState = localStorage.getItem('storeState');


// 创建一个新的 store 实例
const store = createStore({
    state: savedState ? JSON.parse(savedState) : {}, // 初始化时从 localStorage 恢复状态
    mutations: {
        // 设置全局用户信息
        SET_USERINFO(state, user) {
            state.user = user
        },
        // 设置博客设置信息
        SET_BLOG_SETTING(state, setting) {
            state.setting = setting
        },
        // 展开或缩起侧边栏
        HANDLE_MENU_WIDTH(state) {
            state.menuWidth = state.menuWidth == "250px" ? "64px" : "250px"
        },
        SET_IS_ZH(state, value) {
            state.isCN = value
        },
        // 保存isCN到本地
        SAVE_STATE(state) {
            try {
                localStorage.setItem('storeState', JSON.stringify(state));
            } catch (error) {
                console.error('Failed to save state:', error);
            }
        },
        RESTORE_STATE(state) {
            try {
                const savedState = localStorage.getItem('storeState');
                if (savedState) {
                    Object.assign(state, JSON.parse(savedState));
                }
            } catch (error) {
                console.error('Failed to restore state:', error);
            }
        }
    },
    actions: {
        // 获取用户登录信息
        // 入参 commit 相当于 store.commit
        getAdminInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getAdminInfo().then(res => {
                    commit('SET_USERINFO', res.data)
                    // 固定使用格式
                    resolve(res.data)
                }).catch(err => {
                    console.log('获取用户信息失败')
                    reject(err)
                })
            })
        },
        getBlogSetting({ commit }) {
            return new Promise((resolve, reject) => {
                getBlogSettingDetail().then(res => {
                    commit('SET_BLOG_SETTING', res.data)
                    // 固定使用格式
                    resolve(res.data)
                }).catch(err => {
                    console.log('获取博客设置信息失败')
                    reject(err)
                })
            })
        },
        logout({ commit }) {
            removeToken()
            // 删除当前全局的 user 状态
            commit('SET_USERINFO', {})
        }
    },
    plugins: [createPersistedState()],
})

// 暴露
export default store