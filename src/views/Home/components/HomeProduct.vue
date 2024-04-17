<script setup>
import {getProductsAPI} from '@/apis/home'
import ProductsItem from '@/views/Home/components/ProductsItem.vue'

const products = ref([])
const itemsOfPage = ref()
const allItems = ref()

const getProducts = async (page) => {
  const { result,limit,total } = await getProductsAPI(page)
  products.value = result
  itemsOfPage.value = limit
  allItems.value = total
  console.log(result);
}
onMounted( ()=> getProducts())

const handleCurrentChange = (currentPage) => {

  getProducts(currentPage);
}
</script>

<template>
  <div class="home-product">
    <div class="box">
      <ul class="products-list">
          <li v-for="product in products" :key="product.productId">
            <ProductsItem :product="product"></ProductsItem>
          </li>
      </ul>
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
  margin-top: 20px;
  
  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: $xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }

    .products-list {
      width: 1300px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 300px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }

    .products-item {
      display: block;
      width: 300px;
      padding: 20px 30px;
      text-align: center;
      transition: all .5s;

      &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
      }

      img {
        width: 200px;
        height: 200px;
      }

      p {
        padding-top: 10px;
      }

      .name {
        font-size: 16px;
        word-wrap:break-word
      }

      .desc {
        color: #999;
        height: 29px;
      }

      .price {
        color: $priceColor;
        font-size: 20px;
      }
    }
  }

  .el-pagination{
    display: flex;
    justify-content: center;
  }
}
</style>