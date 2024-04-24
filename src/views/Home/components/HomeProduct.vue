<script setup>
import {getProductsAPI} from '@/apis/product'
import ProductsItem from '@/views/Home/components/ProductsItem.vue'

const products = ref([])
const itemsOfPage = ref()
const allItems = ref()

const getProducts = async (page) => {
  const { result,limit,total } = await getProductsAPI(page)
  products.value = result
  itemsOfPage.value = limit
  allItems.value = total
}
onMounted( ()=> getProducts())

const handleCurrentChange = (currentPage) => {

  getProducts(currentPage);
}
</script>

<template>
  <div class="home-product">
    <div class="container">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="box">
        <ProductsItem :productList="products"></ProductsItem>
      </div>
    </div>
    <el-pagination 
      background layout="prev, pager, next" 
      :page-size="itemsOfPage" 
      :total="allItems" 
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped lang='scss'>
.home-product {
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