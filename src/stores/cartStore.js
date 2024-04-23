import {defineStore} from "pinia";
import {useUserStore} from "@/stores/userStore";
import {findNewCartListAPI, insertCartAPI, deleteCartAPI, updateCartItemAPI} from "@/apis/cart";

export const useCartStore = defineStore(
    'cart',
    ()=>{
        const cartList = ref([]);

        const userStore = useUserStore();
        const isLogin = computed(()=>userStore.userInfo.token);

        // 獲取登入後最新購物車列表action
        const updateLoginCartList = async (userId) => {
            if(isLogin.value){
                userId = userStore.userInfo.userId
                const res = await findNewCartListAPI(userId)
                cartList.value = res
            }
        }

        const addCart = async (products) => {
            //判斷商品是否在購物車
            const findItem = cartList.value.find(item=>products.productId === item.productId);
            if(isLogin.value){
                let id = userStore.userInfo.userId
                if(findItem){
                    findItem.quantity += products.quantity
                    updateCartItem(findItem)
                }
                else{
                    await insertCartAPI(id,products)
                    await updateLoginCartList(id)
                }
            }else{
                if(findItem){
                    findItem.quantity += products.quantity;
                }else {
                    cartList.value.push(products)
                }
            }

            
        }
        const deleteCart = async (cartItemId) => {
            if(isLogin.value){
                let id = userStore.userInfo.userId
                //登入後的刪除購物車
                await deleteCartAPI(id, cartItemId)
                await updateLoginCartList(id)
            }else{
                const index = cartList.value.findIndex((item) => cartItemId === item.cartItemId)
                cartList.value.splice(index, 1)
            }
        }
        const allCount = computed(() => cartList.value.reduce((a, c) => a + c.quantity, 0))
        const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.quantity * c.price, 0))
        const checkAll = (selected) => {
            //把cartList中的每一項的selected都設置為當前的全選框狀態
            cartList.value.forEach(item => item.selected = selected)
        }
        const clearCart = () => {
            cartList.value = []
        }
        const updateCartItem = async (cartItem) => {
            if (isLogin.value) {
                let id = userStore.userInfo.userId
                const {cartItemId, userId, productId, quantity} = cartItem
                await updateCartItemAPI(id,cartItemId,{userId, productId, quantity})
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