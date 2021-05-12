# 平滑更新定位

> 因为客户端会每隔n秒重新获取位置，在这个等待时间，需要平滑从上个坐标点移动到下一个坐标点，为了达到这个效果，这里用`mapBox`这个地图引擎做示范效果


## [示例](https://docs.mapbox.com/mapbox-gl-js/example/animate-marker/)


```javascript
// 定义坐标点
const marker = new mapboxgl.Marker();
// 初始经纬度
let oldCoordinate = null
let newCoordinate = null
// 已经平滑移动的时间
let useTime = 0
// 平滑移动到下一个位置的时间
const moveTime = 800 // ms

// 定位sdk返回的点位信息
function update (ressult) {
    if (ressult.success) {
        const point = ressult.data.position
        if (!this.newCoordinate) {
            this.newCoordinate = JSON.parse(JSON.stringify(point))
        } else {
            this.oldCoordinate = JSON.parse(JSON.stringify(this.newCoordinate))
            this.newCoordinate = JSON.parse(JSON.stringify(point))
        }
        useTime = 0
    }
}

// 逐帧更新坐标点
function animateMarker(timestamp) {

// 每帧的移动时间
this.useTime += moveTime / 60
// 确保有定位点
if (!this.oldCoordinate || !this.newCoordinate) {
    return
}
// 阈值处理
if (this.useTime > moveTime) {
    this.useTime = moveTime
}
const [x1, y1] = this.oldCoordinate
const [x2, y2] = this.newCoordinate
// 每一帧在地图上的经纬度
const stampX = x1 + (this.useTime / moveTime) * (x2 - x1)
const stampY = y1 + (this.useTime / moveTime) * (y2 - y1)
 
// 根据动画时间戳将数据更新到新位置
// “moveTime” 控制动画速度。
marker.setLngLat([stampX, stampY]);
// 确保它已添加到地图中。如果已经添加了，可以安全地调用它。
marker.addTo(map);

//请求动画的下一帧。
requestAnimationFrame(animateMarker);
}

//启动动画。
requestAnimationFrame(animateMarker)

```
