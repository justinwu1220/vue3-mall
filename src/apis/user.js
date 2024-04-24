import http from "@/utils/http";

export function loginAPI(user){
    return http.post('/users/login',user);
}

export function registerAPI(user){
    return http.post('/users/register',user);
}

export const getAddressInfoAPI = () => {
    return http.get('/users/addressInfo');    
}

export const createAddressInfoAPI = (data) => {
    return http.post('/users/addressInfo', data);    
}