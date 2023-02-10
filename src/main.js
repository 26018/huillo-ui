import {createApp} from 'vue'
import App from './App.vue'
import './index.css'
import './style/font.css'
import router from './router/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as echarts from 'echarts';
import "./config/axiosConfig.js";

import {createPinia} from "pinia";
import piniaPersist from 'pinia-plugin-persist'

const pinia = createPinia();
pinia.use(piniaPersist);

let app = createApp(App)

app.use(ElementPlus, {
    locale: zhCn,
});

app.use(pinia);
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.$echarts = echarts;

app.mount('#app')
