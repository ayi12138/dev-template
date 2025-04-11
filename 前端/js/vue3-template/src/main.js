import './assets/css/global.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
// element-plus
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// router
import router from './router/index.js'
// vue
const app = createApp(App)
const pinia = createPinia()

app.use(ElementPlus,{
    locale: zhCn,
})
app.use(router)
app.use(pinia)
app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
