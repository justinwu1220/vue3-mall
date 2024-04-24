import http from "@/utils/http";

export function findNewCartListAPI(){
    return http.get('/users/cart');
}

export function insertCartAPI(cartItem){
    return http.post('/users/cart' ,cartItem);
}

export const deleteCartAPI = (cartItemId) => {
    return http.delete('/users/cart/'+ cartItemId)
}

export function updateCartItemAPI(cartItemId, updateData){   
    return http.put('/users/cart/'+ cartItemId ,updateData);
}