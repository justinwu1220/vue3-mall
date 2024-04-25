<script setup>
import {getAllUsersAPI} from '@/apis/user'

const mappedArray = ref([])

const getAllUsers = async (page) => {
  const result = await getAllUsersAPI(page)
  mappedArray.value = result.map(item => ({
    userId: item.userId,
    email: item.email,
    authority: item.authority,
    createdDate: item.createdDate,
    lastModifiedDate: item.lastModifiedDate
  }));
}
onMounted( ()=> getAllUsers())

const search = ref('')
const filterTableData = computed(() =>
  mappedArray.value.filter(
    (data) =>
      !search.value ||
      data.email.toLowerCase().includes(search.value.toLowerCase())
  )
)
</script>

<template>
  <div class="main">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb-item >會員列表</el-breadcrumb-item>
    </div>
    <div class="top">
      <el-input v-model="search"  placeholder="搜尋" class="search"/>
    </div>
    <div class="table-container">
      <el-table :data="filterTableData" border style="width: 100%" height="800"
      :header-cell-style="{ 'text-align': 'center' }">
        <el-table-column prop="userId" label="Id" width="70" align="center" />
        <el-table-column prop="email" label="email" width="300" />
        <el-table-column prop="authority" label="用戶權限" width="200" align="center"/>
        <el-table-column prop="createdDate" label="創建日期" width="200" align="center"/>
        <el-table-column prop="lastModifiedDate" label="最後修改日期" width="200" align="center"/>
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