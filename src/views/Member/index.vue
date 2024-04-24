<script setup> </script>

<template>
  <div class="container">
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item >會員中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div class="xtx-member-aside">
        <div class="user-manage">
          <h4>我的帳戶</h4>
          <div class="links">
            <RouterLink to="/member">個人中心</RouterLink>
          </div>
          <h4>交易管理</h4>
          <div class="links">
            <RouterLink to="/member/order">我的訂單</RouterLink>
          </div>
        </div>
      </div>
      <div class="article">
        <RouterView />
      </div>
    </div>
  </div>
  <br><br>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;

  .bread-container {
    padding: 50px 0;
  }

  .content {
    display: flex;
  }

  .xtx-member-aside {
    min-height: 600px;

    width: 220px;
    margin-right: 20px;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
    border: 1px solid var(--el-card-border-color);
    border-radius: var(--el-card-border-radius);

    .user-manage {
      
      background-color: #fff;

      h4 {
        font-size: 18px;
        font-weight: 400;
        padding: 20px 52px 5px;
        border-top: 1px solid #f6f6f6;
      }

      .links {
        padding: 0 52px 10px;
      }

      a {
        display: block;
        line-height: 1;
        padding: 15px 0;
        font-size: 14px;
        color: #666;
        position: relative;

        &:hover {
          color: $xtxColor;
        }

        &.active,
        &.router-link-exact-active {
          color: $xtxColor;

          &:before {
            display: block;
          }
        }

        &:before {
          content: '';
          display: none;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          position: absolute;
          top: 19px;
          left: -16px;
          background-color: $xtxColor;
        }
      }
    }
  }

  .article {
    flex: 1;
    width: 1000px;
    background-color: #fff;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
    border: 1px solid var(--el-card-border-color);
    border-radius: var(--el-card-border-radius);
  }
}
</style>