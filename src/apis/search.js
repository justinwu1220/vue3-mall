import http from "@/utils/http";

export function getProductsBySearchAPI(search, page = 1){
    const limit = 16
    var offset = 0
    if(page != 1){
        offset = (page - 1) * limit
    }
    
    return http.get('/products',{
        params:{
            limit: limit,
            offset: offset,
            search
        }
    });
}