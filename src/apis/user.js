import http from "@/utils/http";

export function loginAPI(user){
    return http.post('/users/login',user);
}