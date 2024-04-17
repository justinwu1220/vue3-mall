import http from "@/utils/http";

export function getProductsByCategoryAPI(category){
    
    return http.get('/products',{params:{category}});
}