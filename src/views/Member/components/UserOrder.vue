<script setup>
import { useUserStore } from '@/stores/userStore'
import { getUserOrderAPI } from '@/apis/order'
import { onMounted, ref } from 'vue'
import {useRoute} from "vue-router"

const userStore = useUserStore();
const route = useRoute();
const tabTypes = [
  { name: "ALL", label: "全部訂單" },
  { name: "UNPAID", label: "待付款" },
  { name: "FINISH", label: "已完成" },
]

const orderList = ref([])
const itemsOfPage = ref()
const allItems = ref()
var cp;

const getOrderList = async (s, page=1) => {
  cp=page;
  const params = {
    state:s,
    limit:3,
    offset:0,
    page:cp
  }
  const { result,limit,total } = await getUserOrderAPI(params)
  orderList.value = result
  itemsOfPage.value = limit
  allItems.value = total
}
onMounted(() => getOrderList(route.params.state))

onBeforeRouteUpdate((to)=>{

getOrderList(to.params.state)
})

const handleCurrentChange = (currentPage) => {

  getOrderList(route.params.state,currentPage);
}
const formatPayState = (payState) => {
  const stateMap = {
    1: '待付款',
    2: '已完成'
  }
  return stateMap[payState]
}
const tabChange = (state) => {
  var s ;
  switch (state) {
    case '0':
      s='ALL';
      break;
    case '1':
      s='UNPAID';
      break;
    case '2':
      s='COMPLETED';
      break;
  }
  getOrderList(s)
}
</script>

<template>
  <div class="order-container">
    <el-tabs @tab-change="tabChange">
      <el-tab-pane v-for="item in tabTypes" :key="item.name" :label="item.label" />

      <div class="main-container">
        <div class="holder-container" v-if="orderList.length === 0">
          <el-empty description="暫無訂單數據" />
        </div>
        <div v-else>
          <div class="order-item" v-for="order in orderList" :key="order.orderId">
            <div class="head">
              <span>下單時間：{{ order.createdDate }}</span>
              <span>訂單編號：{{ order.orderId }}</span>
            </div>
            <div class="body">
              <div class="column goods">
                <ul>
                  <li v-for="item in order.orderItemList" :key="item.orderItemId">
                    <a class="image" href="javascript:;">
                      <img :src="item.imageUrl" alt="" />
                    </a>
                    <div class="info">
                      <br>
                      <p class="name ellipsis-2">
                        {{ item.productName }}
                      </p>
                    </div>
                    <div class="price"><br>$ {{ item.amount/item.quantity }}</div>
                    <div class="count"><br>x {{ item.quantity }}</div>
                  </li>
                </ul>
              </div>
              <div class="column state">
                <p>{{ order.state }}</p>
              </div>
              <div class="column amount">
                <p class="red">$ {{ order.totalAmount }}</p>
                <p>（含運費：$ {{ 0 }}）</p>
              </div>
              <div class="column action">
                <el-button  v-if="order.state === 'UNPAID'" type="primary"
                            size="small">
                  立即付款
                </el-button>
                <el-button v-if="order.orderState === 3" type="primary" size="small">
                  確認收貨
                </el-button>
                <p v-if="[2, 3, 4, 5].includes(order.orderState)">
                  <a href="javascript:;">再次購買</a>
                </p>
                <p v-if="[4, 5].includes(order.orderState)">
                  <a href="javascript:;">申請售後</a>
                </p>
                <p v-if="order.orderState === 1"><a href="javascript:;">取消訂單</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination-container">
        <el-pagination 
          background layout="prev, pager, next" 
          :page-size="itemsOfPage" 
          :total="allItems" 
          @current-change="handleCurrentChange"
        />
      </div>

    </el-tabs>
  </div>

</template>

<style scoped lang="scss">
.order-container {
  padding: 10px 20px;

  .pagination-container {
    display: flex;
    justify-content: center;
  }

  .main-container {
    min-height: 600px;

    .holder-container {
      min-height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;

  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;

    span {
      margin-right: 20px;

      &.down-time {
        margin-right: 0;
        float: right;

        i {
          vertical-align: middle;
          margin-right: 3px;
        }

        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }

    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }

  .body {
    display: flex;
    align-items: stretch;

    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      display: flex;
      align-items: center;

      >p {
        padding-top: 10px;
      }

      &:first-child {
        border-left: none;
      }

      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;

        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;

            &:last-child {
              border-bottom: none;
            }

            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }

            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;

              p {
                margin-bottom: 5px;

                &.name {
                  height: 38px;
                }

                &.attr {
                  color: #999;
                  font-size: 12px;

                  span {
                    margin-right: 5px;
                  }
                }
              }
            }

            .price {
              width: 100px;
            }

            .count {
              width: 80px;
            }
          }
        }
      }

      &.state {
        width: 120px;

        .green {
          color: $xtxColor;
        }
      }

      &.amount {
        width: 200px;

        .red {
          color: $priceColor;
        }
      }

      &.action {
        width: 140px;

        a {
          display: block;

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }
}
</style>