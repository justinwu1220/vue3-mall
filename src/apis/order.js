import http from "@/utils/http";

/*export const getUserOrderAPI = (page = 1) => {
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
}*/
export function getUserOrderAPI(params){
    var {state,limit,offset,page=1} = params
    if(page != 1){
        offset = (page - 1) * limit
    }
    if(state == 'ALL') state=''
    return http.get('/users/orders',{
        params: {
            limit: limit,
            offset: offset,
            state
        }
    });
}

export const createOrderInfoAPI = (data) => {
    return http.post('/users/orders', data);    
}