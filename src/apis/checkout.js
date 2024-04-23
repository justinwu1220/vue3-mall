import http from '@/utils/http'

export const getAddressInfoAPI = (userId) => {
    return http.get('/users/'+ userId +'/addressInfo');    
}

export const createAddressInfoAPI = (userId, data) => {
    return http.post('/users/'+ userId +'/addressInfo', data);    
}

export const createOrderInfoAPI = (userId, data) => {
    return http.post('/users/'+ userId +'/orders', data);    
}