import axios from "axios";
import {ElMessage} from "element-plus";
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router';

const http = axios.create({
    baseURL:'http://localhost:8080',
    timeout:5000
});
//axios請求攔截器
//一般進行token身份驗證
http.interceptors.request.use(config => {
    const userStore = useUserStore();
    const token = userStore.userInfo.token;
    if(token){
        config.headers["token"] = `${token}`
    }
    return config
}, e => Promise.reject(e))
  
  //axios響應式攔截器
  //一般進行錯誤的統一提示，token失效的處理
http.interceptors.response.use(res => res.data, e => {
    //統一錯誤提示
    ElMessage({type: 'error', message: e.response.data})
    //401token失效處理
    const userStore = useUserStore();
    const router = useRouter();
    if(e.response.status === 401){
        //userStore.clearUserInfo()
        //router.push('/login')
    }
    return Promise.reject(e)
})
  
  
export default http