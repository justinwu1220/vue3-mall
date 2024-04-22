import axios from "axios";
import {ElMessage,ElMessageBox} from "element-plus";
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/index.css'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router';
import router from '@/router';

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
    //const router = useRouter();
    if(e.response.status === 401){
        ElMessageBox.alert('登入逾時 或 登入帳號權限不足，請重新登入', '登入異常警告', {
            confirmButtonText: 'OK'
        }).then(() => {router.push('/login')})
    }
    return Promise.reject(e)
})
  
  
export default http