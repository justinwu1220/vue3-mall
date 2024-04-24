<script setup>
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore()
const userStore = useUserStore()
const router = useRouter()
const confirm = () => {
  userStore.clearUserInfo()
  cartStore.clearCart()
  router.push('/login')
}

</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <li><a href="javascript:;"> {{ userStore.userInfo.email }}</a></li>
        <li>
        <el-popconfirm title="確認退出嗎??" @confirm="confirm" confirm-button-text="確認" cancel-button-text="取消">
            <template #reference>
            <a href="javascript:;">退出登入</a>
            </template>
        </el-popconfirm>
        </li>
      </ul>
    </div>
  </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #333;
  width: 100%;
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