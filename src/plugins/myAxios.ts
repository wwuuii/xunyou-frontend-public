import axios from "axios";
const baseURL = import.meta.env.MODE === 'production' ? 'https://xxx' : 'http://localhost:8102/api';
// Set config defaults when creating the instance
const myAxios = axios.create({
    baseURL,
    withCredentials: false,
});

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    let token = window.localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
//
// 添加响应拦截器
myAxios.interceptors.response.use(function (response:any) {
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
myAxios.defaults.withCredentials = true; // 允许携带 cookie
export default myAxios;