import axios from "axios";
import {ElMessage} from "element-plus";
import 'element-plus/theme-chalk/el-message.css'

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
    //統一錯誤提示
    ElMessage({type: 'error', message: e.response.data.message})
    return Promise.reject(e)
})
  
  
export default http