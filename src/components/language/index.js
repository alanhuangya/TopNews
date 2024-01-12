import { createI18n } from 'vue-i18n'; //引入vue-i18n组件
import zh from './zh';
import jp from './jp';
//注册i18n实例并引入语言文件
const i18n = createI18n({
    legacy:false,
    locale: 'zh', // 语言标识（缓存里面没有就用中文）
    fallbackLocale:'zh' , //没有英文的时候默认中文语言
    messages: {
        zh,
        jp
    }
});
export default i18n