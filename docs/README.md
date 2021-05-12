# MallTo Location SDK

墨兔室内定位SDK

## 文档

文档参见docs目录

示例参见example目录

[点位更新平滑移动方案](./smoothPosition.md)



## 安装

> 请先在项目中引入SDK对应的模式的代码，下面的例子统一放在`src/lib`文件夹中

### Es Module

```typescript
import MallToLocation from './lib/dist/mall-to-location-sdk-es'
const mallToLocation = new MallToLocation({
    appId: '999',
    appSecret: 'testsecret',
    uuid: '1008'
    // inertialNavigationOptions: {
    //   openWorker: false // 是否启用webWorker，默认启用
    // }
})
```


## 使用方法

### 开启导航

```typescript
mallToLocation.onPosition(
    {
        // ⚠️ 这里可以用open、userId、macId、等有效唯一标识
        openid: '1',
        // userId: '1',
        // macId: '1',
        // [key: string]: string 传入一种唯一标识即可
    },
    {
      delay,
      interval
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

### 关闭导航

```typescript
mallToLocation.stopPosition()
```

### 开启惯性导航的动作和方向授权

> ⚠️请确保当前的域名是在HTTPS下的，并且非Chrome的手机浏览器, 推荐用Firefox Mobile

```typescript
const result = await mallToLocation.startInertialNavigation()
if (result.success) {
    console.log('惯性导航授权打开成功')
} else {
    console.log('惯性导航授权打开失败: \t', result.msg)
}
```

### 在位置监听服务中，开启惯导辅助

> 请确保打开惯导辅助前，已经打开了位置监听服务

```typescript
mallToLocation.onInertialNavigation((type, data) => {
    if (type === 'error') {
        console.log('触发错误')
    }
    if (type === 'motion') {
        console.log('触发惯导更新位置，返回位置')
    } else if (type === 'orientation') {
        console.log('触发方向更新，返回角度')
    }
})
```

### 手动设定经纬度，开启惯导辅助

> ⚠️ 请确保惯导计算位置更新前，已经设定好了最新的位置，不然可能有偏差

```typescript
// 手动传入位置
mallToLocation.setPosition(defaultPosition)
mallToLocation.onInertialNavigation((type, data) => {
    if (type === 'error') {
        console.log('触发错误')
    }
    if (type === 'motion') {
        console.log('触发惯导更新位置，返回位置')
    } else if (type === 'orientation') {
        console.log('触发方向更新，返回角度')
    }
})
```
