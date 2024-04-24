<script setup>
import {getProductsByCategoryAPI} from "@/apis/category"
import { onMounted, onUpdated, ref } from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router"
import ProductsItem from "@/views/Home/components/ProductsItem.vue"

const categoryData = ref({});
const itemsOfPage = ref()
const allItems = ref()
const route = useRoute();
var cp;

const getProductsByCategory = async (category, page=1) => {
  cp=page;
  const {result,limit,total} = await getProductsByCategoryAPI(category, page);
  categoryData.value = result;
  itemsOfPage.value = limit
  allItems.value = total
}
onMounted( ()=>{
  getProductsByCategory(route.params.category);
});

onBeforeRouteUpdate((to)=>{

  getProductsByCategory(to.params.category)
})

const handleCurrentChange = (currentPage) => {
  getProductsByCategory(route.params.category,currentPage);
}
</script>

<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
          <el-breadcrumb-item>{{ route.params.category }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="box">
        <ProductsItem :productList="categoryData"></ProductsItem>
      </div>
      <el-pagination 
        :current-page="cp"
        background layout="prev, pager, next" 
        :page-size="itemsOfPage" 
        :total="allItems" 
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>


<style scoped lang="scss">
.top-category {
  background: #fff;
  .box {
    background: #fff;
    min-height: 1000px;
  }
}

.bread-container {
  padding: 50px 0;
}

.el-pagination{
  padding: 30px 0;
  display: flex;
  justify-content: center;    
  align-items: center;
}
</style>