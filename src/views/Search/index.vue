<script setup>
import {getProductsBySearchAPI} from "@/apis/search"
import { onMounted, onUpdated, ref } from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router"
import ProductsItem from "@/views/Home/components/ProductsItem.vue"

const searchData = ref({});
const itemsOfPage = ref()
const allItems = ref()
const route = useRoute();

const getProductsBySearch = async (search, page=1) => {
  const {result,limit,total} = await getProductsBySearchAPI(search, page);
  searchData.value = result;
  itemsOfPage.value = limit
  allItems.value = total
  console.log(searchData)
}
onMounted( ()=>getProductsBySearch(route.params.search));

onBeforeRouteUpdate((to)=>{
    getProductsBySearch(to.params.search)
})

const handleCurrentChange = (currentPage) => {
  getProductsBySearch(route.params.search,currentPage);
}
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
          <el-breadcrumb-item>搜尋結果 : {{ route.params.search }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="box">
        <div v-if="searchData.length > 0">
          <ProductsItem :productList="searchData"></ProductsItem>
        </div>
        <div v-else class="noContent">
          <img src="@/assets/images/noContentFound.png">
          <p>查無商品</p>
        </div>
      </div>
      <div v-if="searchData.length > 0">
        <el-pagination 
          background layout="prev, pager, next" 
          :page-size="itemsOfPage" 
          :total="allItems" 
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.top-category {
  background: #fff;
  .box {
    background: #fff;
    height: 1300px;
  }
}

.bread-container {
  padding: 25px 0;
}

.noContent {
  display: flex;   
  align-items: center;
  flex-direction: column;
  img {
      object-fit: contain;
      width: 700px;
      height: 500px;
      background: #fff;
    }
}

.el-pagination{
  padding: 30px 0;
  display: flex;
  justify-content: center;    
  align-items: center;
}
</style>