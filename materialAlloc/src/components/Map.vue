<script setup>
import { getLine, getMarkers } from '@/hooks/decorateMap.js'
import { onMounted, watch } from 'vue'
import { usePointStore } from '@/stores/points'
import { ref } from 'vue'

const Amap = ref(null)
const map = ref(null)

let props = defineProps({
  isTransported: Boolean,
  startPoint: String,
  endPoint: String,
  resource: String,
  amount: Number,
})

// 监听 isTransported 的变化，当 isTransported 变为 true 时（按钮被点击时），开始绘制线路
watch(() => props.isTransported,() => {
  // 因为是异步操作，先保证 Amap 和 map 已经加载
  if (Amap.value && map.value && props.isTransported) {
    // ---------------------调用算法获取运输路线-----------------------------
    console.log(props.startPoint, props.endPoint, props.resource, props.amount);
    // getRoutes(props.startPoint, props.endPoint, props.resource, props.amount)

    // 测试用
    const allRoutes = [[{'Lng': 112.5507, 'Lat': 37.8706}, {'Lng': 116.4074, 'Lat': 39.9042}], [{'Lng': 121.4737, 'Lat': 31.2304}, {'Lng': 108.9541, 'Lat':  34.2658}]];
    
    // 遍历数组绘制路线
    allRoutes.forEach((oneRoute) => {
      getLine(Amap.value, map.value, oneRoute)
    })
  }
})

onMounted(() => {
  const pointStore = usePointStore()

  AMapLoader.load({
    key: "558c6b597d3ca113e53bbb5aa78f5d76",  // 申请好的Web端开发者Key，首次调用 load 时必填     
    version: "2.0",                 // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  }).then((AMap) => {
    Amap.value = AMap
    map.value = new AMap.Map('mapArea', {
      viewMode: '2D',  // 默认使用 2D 模式
      zoom: 5,  //初始化地图层级
      mapStyle: 'amap://styles/whitesmoke',  //设置地图的显示样式
      center: [112.5507, 37.8706]  //初始化地图中心点
    })

    // 获取初始物资点点位
    getMarkers(AMap, map.value, pointStore.allPointPosition)
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