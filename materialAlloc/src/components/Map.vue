<script setup>
import { getLine } from '@/hooks/decorateMap.js'
import { onMounted, watch, defineEmits } from 'vue'


// const emit = defineEmits(["isClicked"]); //声明 emits

// 监听js中的isClicked变化，当isClicked为true时，触发事件，提示父组件显示box组件; 否则不显示
// watch(() => [isClicked, clickedObject], (newVal) => {
//   emit("isClicked", { isClicked: newVal[0].value, clickedObject: newVal[1].value ? newVal[1].value : clickedObject.value });
// },{
//   deep: true
// })


onMounted(() => {
  AMapLoader.load({
    key: "558c6b597d3ca113e53bbb5aa78f5d76",  // 申请好的Web端开发者Key，首次调用 load 时必填     
    version: "2.0",                 // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  }).then((AMap) => {
    const map = new AMap.Map('mapArea', {
      viewMode: '2D',  // 默认使用 2D 模式
      zoom: 5,  //初始化地图层级
      mapStyle: 'amap://styles/whitesmoke',  //设置地图的显示样式
      center: [112.5507, 37.8706]  //初始化地图中心点
    })

    // 获取初始物资点点位
    // getMarkers(AMap, map)
    getLine(AMap, map);
  })
})

</script>
<template>
  <div id="mapArea">
  </div>
</template>

<style>
#mapArea {
  width: 100%;
  height: 100vh;
}
</style>