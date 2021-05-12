export const addHtmlLog = (tag, res) => {
  const logNode = document.getElementById('log')
  if (res && logNode) {
    logNode.innerHTML += `<p>${tag}: data: ${JSON.stringify(
      res.data || res
    )}</p>`
    setTimeout(() => {
      logNode.scrollTop = logNode.scrollHeight + 40
    }, 0)
  }
}
export const mockUpload = uploadTimer => {
  let uploadValue = ''
  let uploadKey = ''
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
  uploadTimer = true
  const sendRequest = () => {
    const data = new FormData()
    data.append(uploadKey, uploadValue)
    data.append(
      'beacons',
      '[{"minor":30404,"rssi":"-71","major":10189,"proximity":"2","accuracy":"2.950457","uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825"},{"minor":30389,"rssi":"-78","major":10189,"proximity":"3","accuracy":"6.340919","uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825"},{"minor":30360,"rssi":"-72","major":10189,"proximity":"3","accuracy":"6.356401","uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825"},{"minor":30407,"rssi":"-61","major":10189,"proximity":"3","accuracy":"6.828811","uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825"},{"minor":28481,"rssi":"-83","major":10189,"proximity":"3","accuracy":"7.278657","uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825"},{"minor":30406,"rssi":"-68","major":10189,"proximity":"3","accuracy":"9.997347","uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825"},{"minor":28818,"rssi":"-71","major":10189,"proximity":"3","accuracy":"12.137011","uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825"},{"minor":30368,"rssi":"-77","major":10189,"proximity":"3","accuracy":"12.509578","uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825"},{"minor":30367,"rssi":"-80","major":10189,"proximity":"3","accuracy":"13.959773","uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825"},{"minor":30277,"rssi":"-83","major":10189,"proximity":"3","accuracy":"14.274048","uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825"},{"minor":30280,"rssi":"-90","major":10189,"proximity":"3","accuracy":"15.039988","uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825"},{"minor":30366,"rssi":"-80","major":10189,"proximity":"3","accuracy":"15.901205","uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825"}]'
    )
    const xhr = new XMLHttpRequest()
    xhr.withCredentials = true
    xhr.onload = function () {
      console.log('DONE', xhr.status)
      if (xhr.status) {
        addHtmlLog('beacons', '上报beacons成功')
      } else {
        addHtmlLog('beacons', '上报beacons成功')
      }
      if (uploadTimer) {
        setTimeout(() => sendRequest(), 1000)
      }
    }
    xhr.open('POST', '/api/lbs/location_data')
    xhr.setRequestHeader('cache-control', 'no-cache')
    xhr.setRequestHeader('Signature-Version', '999')
    xhr.setRequestHeader('app-id', '999')
    xhr.setRequestHeader('Accept', 'application/json')
    let projectId = '1008'
    if (document.getElementById('projectId')) {
      projectId = Number(document.getElementById('projectId').value) || 1008
      console.log('upload project Id', projectId)
    }
    xhr.setRequestHeader('UUID', projectId)
    xhr.send(data)
  }
  sendRequest()
}
