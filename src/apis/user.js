import http from "@/utils/http";

export function loginAPI(user){
    return http.post('/users/login',user);
}

export function registerAPI(user){
    return http.post('/users/register',user);
}

export const getAddressInfoAPI = (userId) => {
    return http.get('/users/'+ userId +'/addressInfo');    
}

export const createAddressInfoAPI = (userId, data) => {
    return http.post('/users/'+ userId +'/addressInfo', data);    
}