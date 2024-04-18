<script setup>
defineProps({
    productList: {
        type: Array,
        default: () => { }
    }
})
</script>

<template>
  <el-row :gutter="10">
    <el-col v-for="(product, index) in productList" :key="index" :span="6" style="margin-bottom:20px">
      <RouterLink :to="`/detail/${product.productId}`" to="/">
        <el-card class="box-card" shadow="always" :body-style="{ padding: '0px' }" >
          <div slot="header" class="header" align="middle">
            <img
              :src="product.imageUrl" rel="external nofollow" 
              class="image"
            />
          </div>
          <div style="margin: 15px">
            <div>
              <div class="card-label">{{product.productName}}</div>
            </div>
            <div>
              <div class="card-label price">${{product.price}}</div>
            </div>
          </div>
        </el-card>
      </RouterLink>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.el-row {
  display:flex;
  flex-wrap: wrap;
  align-items: center;
}
.el-row  .el-card {
  min-width: 100%;
  height: 100%;
  margin-right: 20px;
  transition: all .5s;
}
.box-card {
  &:hover {
    transform: translate3d(0, -30px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }
  .card-label {
    color: rgb(24, 23, 23);
    margin-left: 15px;
    //width: 70px;
    display: inline-block;
    margin-bottom: 5px;
  }
  .price {
    color: rgb(215, 34, 34);
  }
  .image {
    margin-top: 10px;
    height: 200px;
    display: flex;
  }
}
</style>