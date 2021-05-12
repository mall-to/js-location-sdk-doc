# MallTo Location SDK
墨兔室内定位SDK

## 快速上手

### 引入依赖库

> 请先在项目中引入SDK对应的模式的代码(在dist目录中)，下面的例子统一放在`src/lib`文件夹中

### 初始化

> 需要在项目入口或者对应的页面引用，并且初始化sdk

```typescript
import MallToLocation from './lib/dist/mall-to-location-sdk-es'
const mallToLocation = new MallToLocation({
    appId: '999',
    appSecret: 'testsecret',
    uuid: '1008'
})
```

### 开启定位

```typescript
    mallToLocation.onPosition({
        // ⚠️ 这里可以用openid、user_id、mac、等有效唯一标识
        openid: 1 //or mac:xxxxx
    }, {
        openInertialNavigation: false, // 开启惯性导航 默认关闭,关闭时每秒返回一次定位结果,开启后100ms返回一次定位结果
    }, res => {
        console.log(res)
        if (res.success) {
            console.log('位置信息: \t', res.data.position)
        } else {
            console.log('位置信息获取失败: \t', res.data.msg)
        }
    })
```

### 停止定位

### 更好的渲染点位到地图上
因为两次定位结果返回有时间间隔,所以可以在渲染点位的时候加入位移动画,从而有更好的显示效果.
[详见点位更新平滑移动方案](./smoothPosition.md)


```typescript
    mallToLocation.stopPosition()
```

## 示例代码
[详见](https://github.com/mall-to/js-location-sdk-doc/tree/master/example)




## 详细定位API

### 定位监听

```typescript
mallToLocation.onPosition(
    {
        // ⚠️ 这里可以用openid、user_id、mac、等有效唯一标识
        openid: 1 //or mac:xxxxx
        // userId: '1',
        // macId: '1',
        // [key: string]: string 传入一种唯一标识即可
    },
    {
        delay: 0, // 延迟n秒后开始获取位置, 默认0
        interval: 1000, // 每隔n秒获取一次位置, 默认1000
        delayStopTime: 10 * 1000, // 位置停止移动延迟停止位置更新时间 默认10秒
        stopWalkingRefreshRange: 2, // 人物停止移动后位置更新的边界 默认2米
        openInertialNavigation: false // 开启惯性导航 默认关闭,关闭时每秒返回一次定位结果,开启后100ms返回一次定位结果
    },
    res => {
      console.log(res)
      if (res.success) {
          console.log('位置信息: \t', res.data.position)
      } else {
          console.log('位置信息获取失败: \t', res.data.msg)
      }
    }
)

```

### 停止定位

```typescript
mallToLocation.stopPosition()
```

[更多API文档](https://mall-to.github.io/js-location-sdk-doc/classes/_index_.location.html#onposition)

