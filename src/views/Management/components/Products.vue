<script lang="ts" setup>
import {useRoute} from "vue-router"
import {getProductsByCategoryAPI} from "@/apis/category"
import {deleteProductAPI,updateProductAPI,addProductAPI} from '@/apis/product'
import {ElMessage,ElMessageBox} from "element-plus";
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
import { getProductDetail } from '@/apis/detail'

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
    limit:1000,
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

const search = ref('')
const filterTableData = computed(() =>
  mappedArray.value.filter(
    (data) =>
      !search.value ||
      data.productName.toLowerCase().includes(search.value.toLowerCase())
  )
)

const showAddProduct = ref(false)
const showEdit = ref(false)

const addForm = ref({
  productName: '',
  category: '',
  price: '',
  stock: '',
  description: '',
  imageUrl: '',
  otherImagesUrl: ''
});
const form = reactive({
  productId: '',
  productName: '',
  category: '',
  price: '',
  stock: '',
  description: '',
  imageUrl: '',
  otherImagesUrl: ''
});
const formRef = ref(null);
const rules = {
  productName: [
    {required: true, message: '商品名稱不能為空',trigger: 'blur'}
  ],
  category: [
    {required: true, message: '商品類別不能為空',trigger: 'blur'},
  ],
  price: [
    {required: true, message: '商品金額不能為空',trigger: 'blur'},
  ],
  stock: [
    {required: true, message: '商品庫存不能為空',trigger: 'blur'},
  ],
  imageUrl: [
    {required: true, message: '商品圖片不能為空',trigger: 'blur'},
  ]
}

const updateEdit = ()=>{
  formRef.value.validate(async (valid)=>{
    if(valid){
        const productId = form.productId
        const productName = form.productName
        const category = form.category
        const price = form.price
        const stock = form.stock
        const description = form.description
        const imageUrl = form.imageUrl
        const otherImagesUrl = form.otherImagesUrl
        await updateProductAPI(
          productId,
          {
            productName,
            category,
            price,
            stock,
            description,
            imageUrl,
            otherImagesUrl
          })

        ElMessage({type:'success',message:'編輯成功'})
        getProductsByCategory(route.params.category)
    }
  })
}

const addProduct = ()=>{
  formRef.value.validate(async (valid)=>{
    if(valid){
      var {
        productName,
        category,
        price,
        stock,
        description,
        imageUrl,
        otherImagesUrl
      } = addForm.value
      if (otherImagesUrl) {
        otherImagesUrl = otherImagesUrl.trim();
        otherImagesUrl = otherImagesUrl.split(',').map(url => url.trim());
      } else {
        otherImagesUrl = [];
      }
      await addProductAPI(
        {
          productName,
          category,
          price,
          stock,
          description,
          imageUrl,
          otherImagesUrl
      })

      ElMessage({type:'success',message:'新增成功'})
      getProductsByCategory(route.params.category)
    }
  })
}

const handleEdit = async (index: number, row: mappedArray) => {
  const res = await getProductDetail(row.productId)
  form.productId = res?.productId;
  form.productName = res?.productName;
  form.category = res?.category
  form.price = res?.price
  form.stock = res?.stock
  form.description = res?.description
  form.imageUrl = res?.imageUrl

  form.otherImagesUrl = res.otherImagesUrl.join(',\n');

  showEdit.value = true
}
const handleDelete = async (index: number, row: mappedArray) => {
  ElMessageBox.alert('即將刪除商品 Id : '+row.productId+'，請確認是否刪除', '警告 !', {
            confirmButtonText: '確認刪除',
            cancelButtonText: '取消',
            showCancelButton: true,
        }).then(async () => {
          await deleteProductAPI(row.productId)
          ElMessage({type:'success',message:'刪除成功'})
          getProductsByCategory(route.params.category)
        })
}
const splitOtherImagesUrl = () => {
  if (form.otherImagesUrl) {
    form.otherImagesUrl = form.otherImagesUrl.trim(); // 去除首尾空格
    form.otherImagesUrl = form.otherImagesUrl.split(',').map(url => url.trim()); // 拆分字符串并去除每个元素首尾空格
  } else {
    form.otherImagesUrl = [];
  }
}
const add = () => {
  ElMessageBox.alert('請確商品內容是否正確', '即將新增商品內容', {
            confirmButtonText: '確認',
            cancelButtonText: '取消',
            showCancelButton: true
        }).then(async () => {
          addProduct()
          showAddProduct.value = false
        })
}
const confirm = () => {
  ElMessageBox.alert('請確商品內容是否正確', '即將修改商品內容', {
            confirmButtonText: '確認',
            cancelButtonText: '取消',
            showCancelButton: true
        }).then(async () => {
          splitOtherImagesUrl();
          updateEdit()
          showEdit.value = false
        })
}
const cancel = () => {
  showEdit.value = false
  showAddProduct.value = false
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
    <div class="top">
      <el-input v-model="search"  placeholder="搜尋" class="search"/>
      <el-button @click="showAddProduct = true" >新增商品</el-button>
    </div>
    <div class="table-container">
      <el-table :data="filterTableData" border style="width: 100%" height="800"
      :header-cell-style="{ 'text-align': 'center' }">
        <el-table-column prop="productId" label="Id" width="70" align="center" />
        <el-table-column prop="productName" label="商品名稱" width="300" />
        <el-table-column prop="category" label="商品類別" width="120" align="center"/>
        <el-table-column label="商品圖片" width="200" align="center">
          <template #default="scope">            
            <img :src="scope.row.imageUrl"  min-width="100" height="100" />
          </template>
        </el-table-column>
        <el-table-column prop="price" label="商品金額" width="70" align="center"/>
        <el-table-column prop="stock" label="商品數量" width="70" align="center"/>
        <el-table-column prop="description" label="商品描述" width="300" align="center"/>
        <el-table-column prop="createdDate" label="創建日期" width="120" align="center"/>
        <el-table-column prop="lastModifiedDate" label="最後修改日期" width="120" align="center"/>
        <el-table-column label="操作" width="150" align="center">
          <template #default="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)" size="small">
              修改
            </el-button>
            <el-button
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              size="small"
            >
              刪除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <el-dialog v-model="showEdit" title="編輯商品" width="50%" center>
    <div class="form" style="text-align: center">
        <el-form
            ref="formRef"
            label-position="left"
            label-width="auto"
            :model="form"
            :rules="rules"
            style="max-width: 300px display: inline-block"
            status-icon>
                <el-form-item label="Id :" prop="productId">
                    <el-input v-model="form.productId" disabled/>
                </el-form-item>
                <el-form-item label="商品名稱：" prop="productName">
                    <el-input v-model="form.productName" />
                </el-form-item>
                <el-form-item label="商品類別：" prop="category">
                    <el-input v-model="form.category" />
                </el-form-item>
                <el-form-item label="商品價格：" prop="price">
                    <el-input v-model="form.price" />
                </el-form-item>
                <el-form-item label="商品庫存：" prop="stock">
                    <el-input v-model="form.stock" />
                </el-form-item>
                <el-form-item label="商品描述：" prop="description">
                    <el-input v-model="form.description"
                    :autosize="{ minRows: 1, maxRows: 6 }"
                    type="textarea" />
                </el-form-item>
                <el-form-item label="商品圖片：" prop="imageUrl">
                    <el-input v-model="form.imageUrl" />
                </el-form-item>
                <el-form-item label="商品其他圖片：" prop="otherImagesUrl">
                    <el-input v-model="form.otherImagesUrl" 
                    :autosize="{ minRows: 1, maxRows: 6 }"
                    type="textarea" />
                </el-form-item>
        </el-form>
    </div>
    <template #footer>
        <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">送出修改</el-button>
        </span>
    </template>
  </el-dialog>
  <el-dialog v-model="showAddProduct" title="新增商品" width="50%" center>
    <div class="add-form" style="text-align: center">
        <el-form
            ref="formRef"
            label-position="left"
            label-width="auto"
            :model="addForm"
            :rules="rules"
            style="max-width: 300px display: inline-block"
            status-icon>
                <el-form-item label="Id :" prop="productId">
                    <el-input v-model="addForm.productId" disabled/>
                </el-form-item>
                <el-form-item label="商品名稱：" prop="productName">
                    <el-input v-model="addForm.productName" />
                </el-form-item>
                <el-form-item label="商品類別：" prop="category">
                    <el-input v-model="addForm.category" />
                </el-form-item>
                <el-form-item label="商品價格：" prop="price">
                    <el-input v-model="addForm.price" />
                </el-form-item>
                <el-form-item label="商品庫存：" prop="stock">
                    <el-input v-model="addForm.stock" />
                </el-form-item>
                <el-form-item label="商品描述：" prop="description">
                    <el-input v-model="addForm.description"
                    :autosize="{ minRows: 1, maxRows: 6 }"
                    type="textarea" />
                </el-form-item>
                <el-form-item label="商品圖片：" prop="imageUrl">
                    <el-input v-model="addForm.imageUrl" />
                </el-form-item>
                <el-form-item label="商品其他圖片：" prop="otherImagesUrl">
                    <el-input v-model="addForm.otherImagesUrl" 
                    :autosize="{ minRows: 1, maxRows: 6 }"
                    type="textarea" />
                </el-form-item>
        </el-form>
    </div>
    <template #footer>
        <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="add">送出</el-button>
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