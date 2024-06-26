<script setup>
import { useCartStore } from '@/stores/cartStore'
import { useUserStore } from '@/stores/userStore'
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import 'element-plus/theme-chalk/el-message.css'

const cartStore = useCartStore()
const userStore = useUserStore()
const router = useRouter();

const checkout = () => {
  if(!userStore.userInfo.token){
    ElMessage({type:'error',message:'需先登入才能下單'});
  }else if(cartStore.cartList.length == 0){
    ElMessage({type:'error',message:'購物車列表為空'});
  }else if(cartStore.selectedCount == 0){
    ElMessage({type:'error',message:'未勾選商品'});
  }else{
    router.push({path: '/checkout'})
  }
}
</script>

<template>
  <div class="xtx-cart-page">
    <div class="container m-top-20">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
          <el-breadcrumb-item >購物車</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <el-checkbox @change="cartStore.checkAll" :model-value="cartStore.isAll"/>
              </th>
              <th width="400">商品信息</th>
              <th width="220">單價</th>
              <th width="180">數量</th>
              <th width="180">小計</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 商品列表 -->
          <tbody>
            <tr v-for="i in cartStore.cartList" :key="i.cartItemId">
              <td>
                <el-checkbox v-model="i.selected" @change="cartStore.updateCartItem(i)"/>
              </td>
              <td>
                <div class="goods">
                  <RouterLink to="/"><img :src="i.imageUrl" alt="" referrerpolicy="no-referrer"/></RouterLink>
                  <div>
                    <p class="name ellipsis">
                      {{ i.productName }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>$ {{ i.price }}</p>
              </td>
              <td class="tc">
                <el-input-number v-model="i.quantity" :min="1" :max="10" @change="cartStore.updateCartItem(i)"/>
              </td>
              <td class="tc">
                <p class="f16 red">$ {{ (i.price * i.quantity) }}</p>
              </td>
              <td class="tc">
                <p>
                  <el-popconfirm title="確認刪除嗎?" confirm-button-text="確認" cancel-button-text="取消" @confirm="cartStore.deleteCart(i.cartItemId)">
                    <template #reference>
                      <a href="javascript:;">刪除</a>
                    </template>
                  </el-popconfirm>
                </p>
              </td>
            </tr>
            <tr v-if="cartStore.cartList.length === 0">
              <td colspan="6">
                <div class="cart-none">
                  <el-empty description="購物車列表為空">
                    <el-button type="primary" @click="$router.push('/')">隨便逛逛</el-button>
                  </el-empty>
                </div>
              </td>
            </tr>
          </tbody>

        </table>
      </div>
      <!-- 操作欄 -->
      <div class="action">
        <div class="batch">
            共 {{ cartStore.allCount }} 件商品，已選擇 {{ cartStore.selectedCount }} 件，商品合計：
          <span class="red">$ {{cartStore.selectedPrice}}</span>
        </div>
        <div class="total">
          <el-button size="large" type="primary" @click="checkout">下單結算</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-cart-page {
  background: #fff;
  min-height: 1000px;


  .cart {
    background: #fff;
    color: #666;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
    border: 1px solid var(--el-card-border-color);
    border-radius: var(--el-card-border-radius);

    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;

      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;

        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }

      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }

  .cart-none {
    text-align: center;
    padding: 120px 0;
    background: #fff;

    p {
      color: #999;
      padding: 20px 0;
    }
  }

  .tc {
    text-align: center;

    a {
      color: $xtxColor;
    }

    .xtx-numbox {
      margin: 0 auto;
      width: 120px;
    }
  }

  .red {
    color: $priceColor;
  }

  .green {
    color: $xtxColor;
  }

  .f16 {
    font-size: 16px;
  }

  .goods {
    display: flex;
    align-items: center;

    img {
      width: 100px;
      height: 100px;
    }

    >div {
      width: 280px;
      font-size: 16px;
      padding-left: 10px;

      .attr {
        font-size: 14px;
        color: #999;
      }
    }
  }

  .action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 30px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
    border: 1px solid var(--el-card-border-color);
    border-radius: var(--el-card-border-radius);

    .xtx-checkbox {
      color: #999;
    }

    .batch {
      a {
        margin-left: 20px;
      }
    }

    .red {
      font-size: 18px;
      margin-right: 20px;
      font-weight: bold;
    }
  }

  .tit {
    color: #666;
    font-size: 16px;
    font-weight: normal;
    line-height: 50px;
  }

  .bread-container {
  padding: 25px 0;
  }
}
</style>