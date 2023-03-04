import {createApp} from 'vue';
import App from './App.vue';
import './style/index.css';
import './style/font.css';
import './style/frame.css';

import router from './router/index.js';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import * as echarts from 'echarts';
import axios from "./config/axiosConfig.js";

import {createPinia} from "pinia";
import piniaPersist from 'pinia-plugin-persist';

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

// 前端地址
// app.config.globalProperties.$LOCALHOST_PREFIX = 'http://localhost:3000'
app.config.globalProperties.$LOCALHOST_PREFIX = 'http://survey.fixyou.top'

// 接口地址
axios.defaults.baseURL = "http://fixyou.top:8086";
// axios.defaults.baseURL = "http://localhost:8086";

app.mount('#app')
