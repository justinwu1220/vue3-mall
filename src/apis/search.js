import http from "@/utils/http";

export function getProductsBySearchAPI(search){
    
    return http.get('/products',{params:{search}});
}