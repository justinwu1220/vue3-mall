<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HeaderCart from "@/views/Layout/components/HeaderCart.vue";

const searchQuery = ref('');

const router = useRouter();

const search = () => {
  const search = searchQuery.value.trim();
  if(search) {

    const routeParams = {
      path: `/search/${search}`,
    };

    router.push(routeParams);
  }
};
</script>

<template>
  <header class='app-header'>
    <div class="container">
      <h1 class="logo home">
        <RouterLink to="/">Justin商城</RouterLink>
      </h1>
      <ul class="app-header-nav">
        <li>
          <RouterLink active-class="active" :to="`/category/POKEMON`">寶可夢</RouterLink>
        </li>
        <li>
          <RouterLink active-class="active" :to="`/category/KIRBY`">星之卡比</RouterLink>
        </li>
        <li>
          <RouterLink active-class="active" :to="`/category/GUNDAM`">鋼彈模型</RouterLink>
        </li>
      </ul>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜尋" v-model="searchQuery" @keyup.enter="search">
      </div>
      <HeaderCart/>
      
    </div>
  </header>
</template>


<style scoped lang='scss'>
.app-header {
  background: #fff;
  border-bottom: 1px solid #eaeaea;

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/logo.png') no-repeat center 25px / contain;
    }
  }

  .app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;
  
    li {
      margin-right: 40px;
      width: 80px;
      text-align: center;
  
      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
  
        &:hover {
          color: $xtxColor;
          border-bottom: 1px solid $xtxColor;
        }
      }
  
      .active {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }
  }

  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;

    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }

    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }

  .cart {
    width: 50px;

    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;

      .icon-cart {
        font-size: 22px;
      }

      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        background: $helpColor;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial;
      }
    }
  }
}
</style>