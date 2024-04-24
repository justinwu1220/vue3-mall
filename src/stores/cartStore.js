import {defineStore} from "pinia";
import {useUserStore} from "@/stores/userStore";
import {findNewCartListAPI, insertCartAPI, deleteCartAPI, updateCartItemAPI} from "@/apis/cart";
import {ElMessage} from "element-plus";
import 'element-plus/theme-chalk/el-message.css'

export const useCartStore = defineStore(
    'cart',
    ()=>{
        const cartList = ref([]);

        const userStore = useUserStore();
        const isLogin = computed(()=>userStore.userInfo.token);

        // 獲取登入後最新購物車列表action
        const updateLoginCartList = async () => {
            if(isLogin.value){
                const res = await findNewCartListAPI()
                cartList.value = res
            }
        }

        const addCart = async (products) => {
            //判斷商品是否在購物車
            const findItem = cartList.value.find(item=>products.productId === item.productId);
            if(isLogin.value){
                if(findItem){
                    findItem.quantity += products.quantity
                    updateCartItem(findItem)
                }
                else{
                    await insertCartAPI(products)
                    await updateLoginCartList()
                }
            }else{
                if(findItem){
                    findItem.quantity += products.quantity;
                }else {
                    cartList.value.push(products)
                }
            }
            ElMessage({type:'success',message:'加入成功'})

            
        }
        const deleteCart = async (cartItemId) => {
            if(isLogin.value){
                //登入後的刪除購物車
                await deleteCartAPI(cartItemId)
                await updateLoginCartList()
            }else{
                const index = cartList.value.findIndex((item) => cartItemId === item.cartItemId)
                cartList.value.splice(index, 1)
            }
            ElMessage({type:'success',message:'刪除成功'})
        }
        const allCount = computed(() => cartList.value.reduce((a, c) => a + c.quantity, 0))
        const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.quantity * c.price, 0))
        const checkAll = (selected) => {
            //把cartList中的每一項的selected都設置為當前的全選框狀態
            cartList.value.forEach(item => {
                item.selected = selected
                updateCartItem(item)
            })
        }
        const clearCart = () => {
            cartList.value = []
        }
        const updateCartItem = async (cartItem) => {
            if (isLogin.value) {
                const {cartItemId, userId, productId, quantity, selected} = cartItem
                await updateCartItemAPI(cartItemId,{userId, productId, quantity, selected})
            }
        }
        const isAll = computed(() => cartList.value.every((item) => item.selected))
        const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.quantity, 0))
        const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.quantity * c.price, 0))
        const getSelectedItems = () => {
            return cartList.value.filter(item => item.selected)
        }
        return{
            cartList,
            allCount,
            allPrice,
            isAll,
            selectedCount,
            selectedPrice,
            getSelectedItems,

            addCart,
            deleteCart,
            checkAll,
            updateLoginCartList,
            clearCart,
            updateCartItem
        }
    },
    {
      persist:true
    }
)