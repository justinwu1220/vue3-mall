<script setup>
import { getProductDetail } from '@/apis/detail'
import { useRoute } from 'vue-router'
import ImageView from "@/components/ImageView/index.vue"
import {useCartStore} from "@/stores/cartStore";
import {ElMessage} from "element-plus";
import 'element-plus/theme-chalk/el-message.css'
import {useUserStore} from "@/stores/userStore";

const cartStore = useCartStore();
const userStore = useUserStore()

const product = ref({})
let imageUrlList = ref([]);
const route = useRoute()
const getProduct = async () => {
  const res = await getProductDetail(route.params.productId)
  product.value = res
  imageUrlList = product.value.otherImagesUrl
  imageUrlList.unshift(product.value.imageUrl)
}
onMounted(() => getProduct())


//購買數量
const count = ref(1);
//添加購物車
const addCart = () => {
  cartStore.addCart({
    userId: userStore.userInfo.userId,
    productId: product.value.productId,
    productName: product.value.productName,
    imageUrl: product.value.imageUrl,
    price: product.value.price,
    quantity: count.value,
    selected: true  
  })
}
</script>

<template>
  <div class="xtx-goods-page">
    <div class="container">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/${product.category}` }">
            {{ product.category  }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ product.productName }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 商品信息 -->
      <div class="info-container">
        <div>
          <div class="goods-info">
            <div class="media">
                <ImageView :imageList="imageUrlList"/>
              <ul class="goods-sales">
                <li>
                  <p>销量人气</p>
                  <p> 100+ </p>
                  <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                </li>
                <li>
                  <p>商品评价</p>
                  <p>200+</p>
                  <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                </li>
                <li>
                  <p>收藏人气</p>
                  <p>300+</p>
                  <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌信息</p>
                  <p>400+</p>
                  <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                </li>
              </ul>
            </div>
            <div class="spec">
              <!-- 商品信息區 -->
              <p class="g-name"> {{ product.productName }} </p>
              <p class="g-desc">{{ product.description }} </p>
              <p class="g-price">
                <span>$ {{ product.price }}</span>
              </p>
              <div class="g-service">
                <dl>
                  <dt>促銷</dt>
                  <dd>無</dd>
                </dl>
                <dl>
                  <dt>服務</dt>
                  <dd>
                    <span>快速退款</span>
                    <span>退貨免運</span>
                    <a href="javascript:;">了解詳情</a>
                  </dd>
                </dl>
              </div>
              <el-input-number v-model="count" :min="1"/>
              <div>
                <el-button size="large" class="btn" @click="addCart">
                  加入購物車
                </el-button>
              </div>

            </div>
          </div>
          <div class="goods-footer">
            <div class="goods-article">
              <!-- 商品详情
              <div class="goods-tabs">
                <nav>
                  <a>商品详情</a>
                </nav>
                <div class="goods-detail">
                  <ul class="attrs">
                    <li v-for="item in 3" :key="item.value">
                      <span class="dt">白色</span>
                      <span class="dd">纯棉</span>
                    </li>
                  </ul>
                </div>
              </div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang='scss'>
.xtx-goods-page {
  min-height: 1000px;
  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
    }

    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
    }
  }

  .info-container{
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
    border: 1px solid var(--el-card-border-color);
    border-radius: var(--el-card-border-radius);
  }

  .goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
      width: 940px;
      margin-right: 20px;
    }

    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }

  .goods-tabs {
    min-height: 600px;
    background: #fff;
  }

  .goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
  }

  .number-box {
    display: flex;
    align-items: center;

    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
  }

  .g-name {
    font-size: 22px;
  }

  .g-desc {
    color: #999;
    margin-top: 10px;
  }

  .g-price {
    margin-top: 10px;

    span {
      &:first-child {
        color: $priceColor;
        margin-right: 10px;
        font-size: 22px;
      }

      /*&:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 16px;
      }*/
    }
  }

  .g-service {
    background: #f5f5f5;
    width: 500px;
    padding: 20px 10px 0 10px;
    margin-top: 10px;

    dl {
      padding-bottom: 20px;
      display: flex;
      align-items: center;

      dt {
        width: 50px;
        color: #999;
      }

      dd {
        color: #666;

        &:last-child {
          span {
            margin-right: 10px;

            &::before {
              content: "•";
              color: $xtxColor;
              margin-right: 2px;
            }
          }

          a {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .goods-sales {
    display: flex;
    width: 400px;
    align-items: center;
    text-align: center;
    height: 140px;

    li {
      flex: 1;
      position: relative;

      ~li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
        content: "";
      }

      p {
        &:first-child {
          color: #999;
        }

        &:nth-child(2) {
          color: $priceColor;
          margin-top: 10px;
        }

        &:last-child {
          color: #666;
          margin-top: 10px;

          i {
            color: $xtxColor;
            font-size: 14px;
            margin-right: 2px;
          }

          &:hover {
            color: $xtxColor;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      >span {
        color: $priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}

.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  >img {
    width: 100%;
  }
}

.btn {
  margin-top: 20px;

}
.el-input-number{
  margin-top: 60px;
}
.bread-container {
  padding: 50px 0;
}
</style>