import './assets/css/global.css'

import { createApp } from 'vue'
import App from './App.vue'
// element-plus
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// router
import router from './router/index.js'
// vue
const app = createApp(App)

app.use(ElementPlus,{
    locale: zhCn,
})
app.use(router)

app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
