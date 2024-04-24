import http from "@/utils/http";

export const getUserOrder = (page = 1) => {
    const limit = 3
    var offset = 0
    if(page != 1){
        offset = (page - 1) * limit
    }
    return http.get('/users/orders',{
        params: {
            limit: limit,
            offset: offset
        }
    });
}

export const createOrderInfoAPI = (data) => {
    return http.post('/users/orders', data);    
}