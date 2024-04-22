<script setup>
import { getAddressInfoAPI, createAddressInfoAPI } from '@/apis/checkout'
import { useUserStore } from '@/stores/userStore'
import {ref} from 'vue'
import {ElMessage} from "element-plus";
import 'element-plus/theme-chalk/el-message.css'

const userStore = useUserStore()
const checkInfoList = ref([])
const curAddress = ref({})

const getAddressInfo = async () => {
  const res = await getAddressInfoAPI(userStore.userInfo.userId)
  checkInfoList.value = res
  curAddress.value = checkInfoList.value[0]
}

onMounted(() => getAddressInfo())

const showDialog = ref(false)
const showAddAddress = ref(false)
const activeAddress = ref({})
const switchAddress = (item) =>{
    activeAddress.value = item
}

const confirm = () => {
  curAddress.value = activeAddress.value
  showDialog.value = false
}
const cancel = () => {
  showDialog.value = false
  showAddAddress.value = false
}

const form = ref({
  receiver: '',
  contact: '',
  address: '',
})
const formRef = ref(null);

const rules = {
  receiver: [
    {required: true, message: '收貨人不能為空',trigger: 'blur'},
  ],
  contact: [
    {required: true, message: '聯繫方式不能為空',trigger: 'blur'}
  ],
  address: [
    {required: true, message: '收貨地址不能為空',trigger: 'blur'},
  ]
}

const addAddress = ()=>{
  formRef.value.validate(async (valid)=>{
    if(valid){
        const userId = userStore.userInfo.userId
        const {receiver,contact,address} = form.value
        await createAddressInfoAPI(userId, {userId,receiver,contact,address})
        showAddAddress.value = false
        ElMessage({type:'success',message:'新增成功'})
        getAddressInfo()
    }
  })
}
</script>

<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <h3 class="box-title">收貨地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!curAddress">您需要先新增收貨地址才可提交訂單。</div>
              <ul v-else>
                <li><span>收<i />貨<i />人：</span>{{ curAddress.receiver }}</li>
                <li><span>聯繫方式：</span>{{ curAddress.contact }}</li>
                <li><span>收貨地址：</span>{{ curAddress.address }}</li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="showDialog = true">切換地址</el-button>
              <el-button size="large" @click="showAddAddress = true">新增地址</el-button>
            </div>
          </div>
        </div>
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">單價</th>
                <th width="170">數量</th>
                <th width="170">小計</th>
                <th width="170">實付</th>
              </tr>
            </thead>
            <!--tbody>
              <tr v-for="i in checkInfo.goods" :key="i.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="i.picture" alt="">
                    <div class="right">
                      <p>{{ i.name }}</p>
                      <p>{{ i.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ i.price }}</td>
                <td>{{ i.count }}</td>
                <td>&yen;{{ i.totalPrice }}</td>
                <td>&yen;{{ i.totalPayPrice }}</td>
              </tr>
            </tbody-->
          </table>
        </div>
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color:#999">货到付款需付5元手续费</span>
        </div>
        <h3 class="box-title">金額明細</h3>
        <!--div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件數：</dt>
              <dd>{{ checkInfo.summary?.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品總價</dt>
              <dd>$ {{ checkInfo.summary?.totalPrice.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>運<i></i>費：</dt>
              <dd>$ {{ checkInfo.summary?.postFee.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>應付總額</dt>
              <dd class="price">{{ checkInfo.summary?.totalPayPrice.toFixed(2) }}</dd>
            </dl>
          </div>
        </div-->
        <div class="submit">
          <el-button type="primary" size="large" >提交訂單</el-button>
        </div>
      </div>
    </div>
  </div>

  <el-dialog v-model="showDialog" title="切換收貨地址" width="30%" center>
    <div class="addressWrapper">
        <div class="text item" 
        :class="{active:activeAddress.userAddressInfoId===item.userAddressInfoId}"
        @click="switchAddress(item)"
        v-for="item in checkInfoList"  
        :key="item.user_address_info_id">
            <ul>
            <li><span>收<i />貨<i />人：</span>{{ item.receiver }} </li>
            <li><span>聯繫方式：</span>{{ item.contact }}</li>
            <li><span>收貨地址：</span>{{ item.address }}</li>
            </ul>
        </div>
    </div>
    <template #footer>
        <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">確定</el-button>
        </span>
    </template>
  </el-dialog>

  <el-dialog v-model="showAddAddress" title="新增收貨地址" width="50%" center>
    <div class="form">
        <el-form
            ref="formRef"
            label-position="top"
            label-width="auto"
            :model="form"
            style="max-width: 600px"
            :rules="rules"
            status-icon>
                <el-form-item label="收 貨 人:" prop="receiver">
                    <el-input v-model="form.receiver" />
                </el-form-item>
                <el-form-item label="聯繫方式：" prop="contact">
                    <el-input v-model="form.contact" />
                </el-form-item>
                <el-form-item label="收貨地址：" prop="address">
                    <el-input v-model="form.address" />
                </el-form-item>
        </el-form>
    </div>
    <template #footer>
        <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="addAddress">確定</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.xtx-pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: $xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }

    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}

.form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: $priceColor;
          }

          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }
</style>