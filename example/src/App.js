import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import Location from './lib/mall-to-location-sdk-es'
// import Location from '../../../dist/mall-to-location-sdk-es'
import { addHtmlLog, mockUpload } from './helper'
let uploadTimer = false

function App() {
  // 项目id
  const [projectId, setProjectId] = useState('1008')
  const mallToLocationRef = useRef(null)
  useEffect(() => {
    if (projectId) {
      if (mallToLocationRef.current) {
        mallToLocationRef.current.close() // 关闭
        mallToLocationRef.current = null // 释放旧对象
      }
      mallToLocationRef.current = new Location({
        appId: '999',
        appSecret: 'testsecret',
        uuid: projectId,
        host: 'https://integration-easy.mall-to.com'
        // inertialNavigationOptions: {
        //   openWorker: false
        // }
      })
    }
  }, [projectId])
  // =======定位服务相关=======
  const [position, setPosition] = useState([])
  const changeUUID = () => {
    let projectId = '1008'
    if (document.getElementById('projectId')) {
      projectId = Number(document.getElementById('projectId').value) || 1008
    }
    setProjectId(projectId)
  }
  const startPosition = () => {
    let delay = 0
    let interval = 1000
    let uploadValue = ''
    let uploadKey = ''
    if (document.getElementById('delay')) {
      delay = Number(document.getElementById('delay').value) || 0
    }
    if (document.getElementById('interval')) {
      interval = Number(document.getElementById('interval').value) || 1000
    }
    if (document.getElementById('uploadKey')) {
      uploadKey = document.getElementById('uploadKey').value
    }
    if (document.getElementById('uploadValue')) {
      uploadValue = document.getElementById('uploadValue').value
    }
    if (!uploadValue || !uploadKey) {
      alert('请先输入上传key和值')
      return
    }
    mallToLocationRef.current.onPosition(
      {
        [uploadKey]: uploadValue
      },
      {
        delay,
        interval
      },
      res => {
        console.log(res)
        if (res.success) {
          setPosition(res.data.position)
        }
        addHtmlLog('位置信息', res.data)
      }
    )
  }
  const stopPosition = () => {
    mallToLocationRef.current.stopPosition()
  }
  // =======定位服务相关=======

  // =======惯导服务相关=======
  const defaultPosition = [114.07130761103534, 22.53438557030261] // 初始经纬度
  const [staticPosition, setStaticPosition] = useState(defaultPosition)
  const startGuandao = async () => {
    try {
      const result = await mallToLocationRef.current.startInertialNavigation()
      addHtmlLog('inertialNavigation', result)
      if (result.success) {
        mallToLocationRef.current.onInertialNavigation((type, data) => {
          if (type === 'motion') {
            alert('触发惯导更新位置')
          }
          addHtmlLog(type, data)
        })
      }
    } catch (e) {
      alert(e)
    }
  }
  const endGuandao = () => {
    mallToLocationRef.current.stopInertialNavigation()
  }
  const staticGuandao = async () => {
    try {
      const result = await mallToLocationRef.current.startInertialNavigation()
      addHtmlLog('inertialNavigation', result)
      if (result.success) {
        mallToLocationRef.current.setPosition(defaultPosition)
        mallToLocationRef.current.onInertialNavigation((type, data) => {
          if (type === 'motion') {
            setStaticPosition(data.data)
          }
          addHtmlLog(type, data)
        })
      }
    } catch (e) {
      alert(e)
    }
  }
  const resetStaticGuandao = () => {
    mallToLocationRef.current.setPosition(defaultPosition)
    setStaticPosition(defaultPosition)
  }
  // =======惯导服务相关=======

  return (
    <div className="App">
      <div>
        <h1>
          log
          <button
            onClick={() => (document.getElementById('log').innerHTML = '')}>
            清空
          </button>
        </h1>
        <pre id={'log'} />
      </div>
      <div>
        <h1>
          定位
          <br />
          <span style={{ fontSize: '12px' }}>
            Lat: {position[0]} <br />
            Lng: {position[1]}
          </span>
        </h1>
        <p>
          <span>上传key: </span>
          <input
            type="text"
            id={'uploadKey'}
            placeholder={'上传key'}
            defaultValue={'openid'}
          />
        </p>
        <p>
          <span>上传值: </span>
          <input type="text" id={'uploadValue'} placeholder={'上传值'} />
        </p>
        <p>
          <span>延迟: </span>
          <input type="text" id={'delay'} placeholder={'默认0ms'} value={''} />
        </p>
        <p>
          <span>间隔时间: </span>
          <input
            type="text"
            id={'delay'}
            placeholder={'默认1000ms'}
            value={''}
          />
        </p>
        <button onClick={() => mockUpload(uploadTimer)}>模拟上报位置</button>
        <button onClick={() => (uploadTimer = false)}>停止上报位置</button>
        <button onClick={startPosition}>开始获取定位</button>
        <button onClick={stopPosition}>停止获取定位</button>
        <p>
          <span>项目ID</span>
          <input type="text" defaultValue={projectId} id={'projectId'} />
        </p>
        <button onClick={changeUUID}>切换项目ID</button>
      </div>
      <div>
        <h1>
          惯导:{' '}
          <span style={{ color: 'red', fontSize: '14px' }}>
            <br />
            惯导一定要这些条件下才能正常开启:
            <br />
            1. https域名下
            <br />
            2. 打开了动作和方向传感器
          </span>
        </h1>
        <button
          onClick={async () => {
            try {
              if (
                DeviceOrientationEvent &&
                typeof DeviceOrientationEvent.requestPermission === 'function'
              ) {
                DeviceOrientationEvent.requestPermission().then(
                  permissionState => {
                    if (permissionState === 'granted') {
                      // Permission granted
                      console.log('已授权')
                    } else {
                      // Permission denied
                      console.log('授权失败')
                    }
                  }
                )
              }
            } catch (e) {
              console.error(
                '此浏览器没有动作和方向传感器的API, 惯导无法开启: \t',
                e
              )
            }
          }}>
          动作和方向授权
        </button>
        <button onClick={startGuandao}>开启惯导</button>
        <button onClick={endGuandao}>停止惯导</button>
        <p>
          <span>初始位置: {JSON.stringify(defaultPosition)}</span>
          <br />
          <span>惯导定位: {JSON.stringify(staticPosition)}</span>
          <br />
          <button style={{ margin: '10px' }} onClick={staticGuandao}>
            位置惯导
          </button>
          <button style={{ margin: '10px' }} onClick={resetStaticGuandao}>
            更新位置点
          </button>
        </p>
      </div>
    </div>
  )
}

export default App
