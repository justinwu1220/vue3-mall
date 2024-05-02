<script setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import Nav from '@/views/Management/components/Nav.vue'

const item = {
date: '2016-05-02',
name: 'Tom',
address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>

const router
<template>
    <Nav></Nav>
    <el-container class="layout-container-demo" style="height: 500px">
        <el-aside width="200px">
            <el-scrollbar>
                <el-menu router :default-openeds="['0']">
                    <el-menu-item index="/management">
                        <i class="iconfont icon-home"> 首頁</i>
                    </el-menu-item>
                    <el-sub-menu index="1">
                        <template #title>
                            <i class="iconfont icon-product"> 商品列表</i> 
                        </template>
                        <el-menu-item :index="`/management/products/ALL`">
                            全部商品
                        </el-menu-item>
                        <el-menu-item :index="`/management/products/POKEMON`">
                            寶可夢
                        </el-menu-item>
                        <el-menu-item :index="`/management/products/KIRBY`">
                            星之卡比
                        </el-menu-item>
                        <el-menu-item :index="`/management/products/GUNDAM`">
                            鋼彈模型
                        </el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title>
                            <i class="iconfont icon-order"> 訂單列表</i>
                        </template>
                        <el-menu-item index="/management/orders/ALL">
                            全部訂單
                        </el-menu-item>
                        <el-menu-item index="/management/orders/UNPAID">
                            待付款
                        </el-menu-item>
                        <el-menu-item index="/management/orders/COMPLETED">
                            已完成
                        </el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="3">
                        <template #title>
                            <i class="iconfont icon-member"> 會員列表</i>
                        </template>
                        <el-menu-item index="/management/members">
                            全部會員
                        </el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-scrollbar>
        </el-aside>

        <el-container>
            <RouterView />
        </el-container>
    </el-container>
</template>


<style scoped lang='scss'>
.layout-container-demo{
    min-height: 950px;
}

.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
    border-right: none;
    background: var(--el-color-primary-light-8);

    .el-menu-item{
        background: var(--el-color-primary-light-9);
    }
}

.layout-container-demo .el-main {
    padding: 0;
}
.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}

</style>
