// 添加请求拦截器
import axios from "axios";
import {ElMessage} from "element-plus";

axios.interceptors.request.use((config) => {
    config.headers = {
        token: localStorage.getItem("token"),
    };
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    if (response.data.code != null && response.data.code !== 200) {
        if (response.data.code === 257248) {
            ElMessage.info({
                message: "您还未登录，请返回首页登录",
                showClose: true,
                duration: 3000,
            });
            localStorage.removeItem('token');
            return;
        }
        ElMessage.error(response.data.message);
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

