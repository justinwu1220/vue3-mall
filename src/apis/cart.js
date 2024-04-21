import http from "@/utils/http";

export function findNewCartListAPI(userId){
    return http.get('/users/'+ userId +'/cart');
}

export function insertCartAPI(userId, cartItem){
    return http.post('/users/'+ userId +'/cart' ,cartItem);
}

export const deleteCartAPI = (userId, cartItemId) => {
    return http.delete('/users/'+ userId +'/cart/'+ cartItemId)
}

export function updateCartItemAPI(userId, cartItemId, updateData){   
    return http.put('/users/'+ userId +'/cart/'+ cartItemId ,updateData);
}