import http from '@/utils/http'

export function getProductsAPI () {
    return http.get('/products?limit=1000')
}