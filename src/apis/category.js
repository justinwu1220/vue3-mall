import http from "@/utils/http";

export function getProductsByCategoryAPI(params){
    var {category,limit,offset,page=1} = params
    //const limit = 16
    //var offset = 0
    if(page != 1){
        offset = (page - 1) * limit
    }
    console.log(category)
    if(category == 'ALL') category=''
    return http.get('/products',{
        params:{
            limit: limit,
            offset: offset,
            category
        }
    });
}