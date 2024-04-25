import http from '@/utils/http'

export function getProductsAPI (page = 1) {
    const limit = 16
    var offset = 0
    if(page != 1){
        offset = (page - 1) * limit
    }
    return http.get('/products', {
        params: {
          limit: limit,
          offset: offset
        }
      });
}

export function updateProductAPI (productId, updateData) {
  return http.put('/products/' + productId, updateData);
}

export function deleteProductAPI (productId) {
  return http.delete('/products/' + productId);
}