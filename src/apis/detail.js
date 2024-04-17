import http from "@/utils/http";

export function getProductDetail(productId){
    return http.get('/products/'+productId);
}