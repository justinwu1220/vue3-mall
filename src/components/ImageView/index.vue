<script setup>
import {ref} from 'vue'
import {useMouseInElement} from "@vueuse/core"

defineProps({
  imageList:{
    type:Array,
    default:()=>[]
  }
})

const activeIndex = ref(0);
const enterHandler = (i) => {
    activeIndex.value = i;
}

const target = ref(null)
const { elementX, elementY, isOutside } = useMouseInElement(target)
const left = ref(0)
const top = ref(0)
const positionX = ref(0)
const positionY = ref(0)
watch([elementX, elementY, isOutside], () => {

  //如果滑鼠沒有移入到盒子內，不繼續執行
  if (isOutside.value) return

  //有效範圍內控制滑塊距離
  // 横向
  if (elementX.value > 100 && elementX.value < 300) {
    left.value = elementX.value - 100
  }
  // 縱向
  if (elementY.value > 100 && elementY.value < 300) {
    top.value = elementY.value - 100
  }

  // 處理邊界
  if (elementX.value > 300) { left.value = 200 }
  if (elementX.value < 100) { left.value = 0 }

  if (elementY.value > 300) { top.value = 200 }
  if (elementY.value < 100) { top.value = 0 }

  // 控制大圖的顯示
  positionX.value = -left.value * 2
  positionY.value = -top.value * 2

})
</script>


<template>
  <div class="goods-image">
    <!-- 左側大圖-->
    <div class="middle" ref="target">
      <img :src="imageList[activeIndex]" alt="" referrerpolicy="no-referrer"/>
      <!-- 滑塊 -->
      <div class="layer" :style="{ left: `${left}px`, top: `${top}px`}" v-show="!isOutside"></div>
    </div>
    <!-- 小圖列表 -->
    <ul class="small">
      <li v-for="(img, i) in imageList" :key="i" @mouseenter="enterHandler(i)" :class="{active:i===activeIndex}">
        <img :src="img" alt="" referrerpolicy="no-referrer"/>
      </li>
    </ul>
    <!-- 放大鏡大圖 -->
    <div class="large" :style="[
      {
        backgroundImage: `url(${imageList[activeIndex]})`,
        backgroundPositionX: `${positionX}px`,
        backgroundPositionY: `${positionY}px`,
      },
    ]" v-show="!isOutside"></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #fff;
    display: flex;
    justify-content: center;    
    align-items: center;    
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景圖:盒子的大小 = 2:1  將來控制背景圖的移動来實現放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 絕對定位 然后跟隨滑鼠控制left和top屬性就可以讓滑塊移動
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;    

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>