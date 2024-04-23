import http from '@/utils/http'

export const createOrderInfoAPI = (userId, data) => {
    return http.post('/users/'+ userId +'/orders', data);    
}