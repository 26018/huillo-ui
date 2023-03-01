// 添加请求拦截器
import axios from "axios";
import {ElMessage} from "element-plus";
import {navTo} from "../api/util";

// axios.defaults.baseURL = "http://fixyou.top:8086";
axios.defaults.baseURL = "http://localhost:8086";


axios.interceptors.request.use(function (config) {
    config.headers = {
        token: localStorage.getItem("token"),
    };
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    if (response.data.code != null && response.data.code !== 200) {
        if (response.data.code === 257248) {
            ElMessage.info({message: "您还未登录，请登录", showClose: true, duration: 3000,});
            localStorage.removeItem('token');
            navTo('/login')
            return;
        }
        ElMessage.error({
            message: response.data.message,
            showClose: true,
        });
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default axios;