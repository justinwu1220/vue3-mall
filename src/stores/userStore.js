import { loginAPI } from '@/apis/user'
export const useUserStore = defineStore(
    'user', 
    () => {
        const userInfo = ref({})
        const getUserInfo = async (user) => {
            const res = await loginAPI(user)
            userInfo.value = res
        }
        const clearUserInfo = () => {
            userInfo.value = {}
        }
        return {
            userInfo,
            getUserInfo,
            clearUserInfo
        }
    },
    {
        persist:true
    }
)