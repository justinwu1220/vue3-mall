<script lang="ts" setup>
import {useRoute} from "vue-router"
import {getProductsByCategoryAPI} from "@/apis/category"
import {deleteProductAPI} from '@/apis/product'
import {ElMessage,ElMessageBox} from "element-plus";
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'

const route = useRoute();
var cp;
const categoryData = ref({});
const itemsOfPage = ref()
const allItems = ref()
const mappedArray = ref([])

const getProductsByCategory = async (c, page=1) => {
  cp=page;
  const params = {
    category:c,
    limit:100,
    offset:0,
    page:cp
  }
  const {result,limit,total} = await getProductsByCategoryAPI(params);
  categoryData.value = result;
  itemsOfPage.value = limit
  allItems.value = total
  mappedArray.value = result.map(item => ({
    productId: item.productId,
    productName: item.productName,
    category: item.category,
    imageUrl: item.imageUrl,
    price: item.price,
    stock: item.stock,
    createdDate: item.createdDate,
    lastModifiedDate: item.lastModifiedDate
  }));
}

onMounted( ()=>{
  getProductsByCategory(route.params.category);
});

onBeforeRouteUpdate((to)=>{

  getProductsByCategory(to.params.category)
})


const handleEdit = (index: number, row: mappedArray) => {
  console.log(index, row)
}
const handleDelete = async (index: number, row: mappedArray) => {
  ElMessageBox.alert('請確認是否刪除', '即將刪除商品', {
            confirmButtonText: '確認',
            cancelButtonText: '取消',
            showCancelButton: true
        }).then(async () => {
          await deleteProductAPI(row.productId)
          ElMessage({type:'success',message:'刪除成功'})
          getProductsByCategory(route.params.category)
        })
}
</script>

<template>
  <div class="main">
    <!-- 面包屑 -->
    <div class="bread-container">
        <el-breadcrumb separator=">">
        <el-breadcrumb-item >商品列表</el-breadcrumb-item>
        <el-breadcrumb-item>{{ route.params.category }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="table-container">
      <el-table :data="mappedArray" border style="width: 100%" height="800"
      :header-cell-style="{ 'text-align': 'center' }">
        <el-table-column prop="productId" label="Id" width="100" align="center" />
        <el-table-column prop="productName" label="商品名稱" width="300" />
        <el-table-column prop="category" label="商品類別" width="120" align="center"/>
        <el-table-column label="商品圖片" width="200" align="center">
          <template #default="scope">            
            <img :src="scope.row.imageUrl"  min-width="100" height="100" />
          </template>
        </el-table-column>
        <el-table-column prop="price" label="商品金額" width="100" align="center"/>
        <el-table-column prop="stock" label="商品數量" width="100" align="center"/>
        <el-table-column prop="createdDate" label="創建日期" width="200" align="center"/>
        <el-table-column prop="lastModifiedDate" label="最後修改日期" width="200" align="center"/>
        <el-table-column label="操作" width="200" align="center">
          <template #default="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)">
              修改
            </el-button>
            <el-button
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              刪除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
.main {
  margin-left: 70px;

  .bread-container {
      padding: 30px 0;
  }

  .table-container {
    width: 100%;
  }
}

</style>