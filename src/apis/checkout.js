import http from '@/utils/http'

export const getAddressInfoAPI = (userId) => {
    return http.get('/users/'+ userId +'/checkOutInfo');    
}

export const createAddressInfoAPI = (userId, data) => {
    return http.post('/users/'+ userId +'/checkOutInfo', data);    
}