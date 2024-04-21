import http from "@/utils/http";

export function loginAPI(user){
    return http.post('/users/login',user);
}

export function registerAPI(user){
    return http.post('/users/register',user);
}