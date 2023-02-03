import {createApp} from 'vue'
import App from './App.vue'
import './index.css'
import router from './router/index.js'
import ElementPlus, {ElMessage} from 'element-plus'
import 'element-plus/dist/index.css'
import store from "./store/index";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as echarts from 'echarts';
import axios from "axios";
import {createPinia} from "pinia";
import piniaPersist from 'pinia-plugin-persist'

const pinia = createPinia();
pinia.use(piniaPersist);

let app = createApp(App)

app.use(ElementPlus, {
    locale: zhCn,
});

app.use(pinia);
app.use(store)
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.$echarts = echarts;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    config.headers = {
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6ImpheTI1NzI0OCIsInByb2ZpbGUiOiJudWxsIiwiZ3JvdXBMaXN0IjoiW10iLCJpZCI6IjE2MTM0NzIwNzM4MjgyNTM2OTciLCJleHAiOjE2NzU0NzQyNTQsImFjY291bnQiOiIyMDMzNDcxMzQ5QHFxLmNvbSIsInVzZXJuYW1lIjoiTHNrIn0.jA9J2TLx3ZBLlxbFrEzHfu7sQhxlNwrl1cTvXgtDg3Y",
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    if (response.data.code != null && response.data.code !== 200) {
        ElMessage.error(response.data.message);
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});


app.mount('#app')
