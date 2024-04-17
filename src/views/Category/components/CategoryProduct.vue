<script setup>
import {getProductsByCategoryAPI} from "@/apis/category"
import { onMounted, onUpdated, ref } from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router"
import ProductsItem from "@/views/Home/components/ProductsItem.vue"

const categoryData = ref({});
const route = useRoute();
const getProductsByCategory = async (category) => {
    const {result} = await getProductsByCategoryAPI(category);
    categoryData.value = result;
    console.log(categoryData)
}
onMounted( ()=>getProductsByCategory(route.params.category));
onBeforeRouteUpdate((to)=>{
  getProductsByCategory(to.params.category)
})
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
          <el-breadcrumb-item>{{ route.params.category }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="box">
      <ul class="products-list">
          <li v-for="product in categoryData" :key="product.productId">
            <ProductsItem :product="product"></ProductsItem>
          </li>
      </ul>
    </div>
  </div>
</template>


<style scoped lang="scss">
.top-category {
  
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .box {
    display: flex;
    justify-content: center;
    background: #fff;

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

  .bread-container {
    padding: 25px 0;
  }
}
</style>