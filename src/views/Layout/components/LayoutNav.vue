<script setup>
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
const confirm = () => {
  userStore.clearUserInfo()
  router.push('/login')
}

</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="userStore.userInfo.token">
          <li><a href="javascript:;"> {{ userStore.userInfo.email }}</a></li>
          <li>
            <el-popconfirm title="確認退出嗎??" @confirm="confirm" confirm-button-text="確認" cancel-button-text="取消">
              <template #reference>
                <a href="javascript:;">退出登入</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;">我的訂單</a></li>
          <li><a href="javascript:;">會員中心</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">請先登入</a></li>
          <li><a href="javascript:;">幫助中心</a></li>
          <li><a href="javascript:;">關於我們</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>