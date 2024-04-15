import http from "@/utils/http"

export function getProducts(){
    return http.get('/products')
}

export function getProductById(){
    return http.get('/products/10')
}