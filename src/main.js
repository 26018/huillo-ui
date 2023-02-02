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
let app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
});
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
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    if (response.data.code !== 200) {
        ElMessage.error(response.data.message);
    }
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});
app.mount('#app')

