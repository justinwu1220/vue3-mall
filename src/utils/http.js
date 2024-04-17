import axios from "axios";
const http = axios.create({
    baseURL:'http://localhost:8080',
    timeout:5000
});
//axios請求攔截器
//一般進行token身份驗證
http.interceptors.request.use(config => {
    return config
}, e => Promise.reject(e))
  
  //axios響應式攔截器
  //一般進行錯誤的統一提示，token失效的處理
http.interceptors.response.use(res => res.data, e => {
    return Promise.reject(e)
})
  
  
export default http