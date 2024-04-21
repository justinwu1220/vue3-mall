import { loginAPI } from '@/apis/user'
import { useCartStore } from "@/stores/cartStore";

export const useUserStore = defineStore(
    'user', 
    () => {
        const userInfo = ref({})
        const cartStore = useCartStore();
        const getUserInfo = async (user) => {
            const res = await loginAPI(user)
            userInfo.value = res

            await cartStore.updateLoginCartList(userInfo.value.userId);
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