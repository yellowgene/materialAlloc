// 显示存有物资的点位
// 绘制路径折线
const getLine = (AMap, map) => {
    // 配置折线路径
    var path = [
        new AMap.LngLat(116.4074, 39.9042),
        new AMap.LngLat(112.5507, 37.8706),
        new AMap.LngLat(108.9541, 34.2658),
    ];

    // 创建 Polyline 实例
    var polyline = new AMap.Polyline({
        path: path,
        strokeWeight: 2, //线条宽度
        strokeColor: "blue", //线条颜色
        lineJoin: "round", //折线拐点连接处样式
      });

    // 将折线添加至地图实例
    map.add(polyline);
}

export { getLine };