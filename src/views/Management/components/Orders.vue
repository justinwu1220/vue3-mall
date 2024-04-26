<script lang="ts" setup>
import {getUserOrderAPI} from '@/apis/order'

const mappedArray = ref([])
const detailArray = ref([])
const itemsOfPage = ref()
const allItems = ref()
var cp;

const getOrderList = async (page=1) => {
  cp=page;
  const params = {
    limit:1000,
    offset:0,
    page:cp
  }
  const { result,limit,total } = await getUserOrderAPI(params)
  itemsOfPage.value = limit
  allItems.value = total
  mappedArray.value = result.map(item => ({
    orderId: item.orderId,
    userId: item.userId,
    receiver: item.receiver,
    contact: item.contact,
    address: item.address,
    orderItemList: item.orderItemList,
    totalAmount: item.totalAmount,
    createdDate: item.createdDate,
    lastModifiedDate: item.lastModifiedDate
  }));
}

onMounted( ()=> getOrderList())

const search = ref('')
const filterTableData = computed(() =>
  mappedArray.value.filter(
    (data) =>
      !search.value ||
      data.receiver.toLowerCase().includes(search.value.toLowerCase())
  )
)

const showDetail = ref(false)
const handleDetail = (index: number,row: detailArray) => {
    detailArray.value = row.orderItemList.map(item => ({
        orderItemId: item.orderItemId,
        productId: item.productId,
        quantity: item.quantity,
        amount: item.amount,
        productName: item.productName,
        imageUrl: item.imageUrl,
    }));
    //console.log(row.orderItemList)
    showDetail.value = true
}
const confirm = () => {
    showDetail.value = false
}
</script>

<template>
  <div class="main">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb-item >訂單列表</el-breadcrumb-item>
    </div>
    <div class="top">
      <el-input v-model="search"  placeholder="搜尋" class="search"/>
    </div>
    <div class="table-container">
      <el-table :data="filterTableData" border style="width: 100%" height="800"
      :header-cell-style="{ 'text-align': 'center' }">
        <el-table-column prop="orderId" label="Id" width="70" align="center" />
        <el-table-column prop="userId" label="用戶Id" width="70" align="center"/>
        <el-table-column prop="receiver" label="收貨人" width="200" align="center"/>
        <el-table-column prop="contact" label="聯絡方式" width="200" align="center"/>
        <el-table-column prop="address" label="收貨地址" width="300" />
        <el-table-column prop="totalAmount" label="總金額" width="100" align="center"/>
        <el-table-column prop="createdDate" label="創建日期" width="200" align="center"/>
        <el-table-column prop="lastModifiedDate" label="最後修改日期" width="200" align="center"/>
        <el-table-column label="詳情" width="150" align="center">
          <template #default="scope">
            <el-button @click="handleDetail(scope.$index, scope.row)" size="small">
              查看訂單詳情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog v-model="showDetail" title="訂單詳情" width="50%" center>
    <div class="add-form" style="text-align: center">
        <el-table :data="detailArray" height="250" style="width: 100%">
            <el-table-column prop="productId" label="商品Id" />
            <el-table-column prop="productName" label="商品名稱" />
            <el-table-column prop="quantity" label="購買數量"/>
            <el-table-column prop="amount" label="小計"/>
        </el-table>
    </div>
    <template #footer>
        <span class="dialog-footer">
        <el-button type="primary" @click="confirm">確認</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.main {
  margin-left: 70px;

  .bread-container {
      padding: 30px 0;
  }

  .top {
    padding: 10px 0;
    text-align: right;

    .search {
      width: 300px;
      margin-right: 30px;
    }
  }

  .table-container {
    width: 100%;
  }
}
</style>