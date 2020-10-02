/**
 * 获取指定长度的随机字符串
 * @param {int} randomLen
 * @returns {string}
 */
export function randomString(randomLen = 16) {
  let str = ''
  const arr = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D',
    'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z'
  ]
  for (let i = 0; i < randomLen; i++) {
    const pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}

/**
 * 移动端屏幕适配
 */
export function setHtmlFontSize() {
  // 1. 获取当前屏幕的宽度
  const windowWidth = document.documentElement.offsetWidth
  // 2. 定义标准屏幕宽度 假设375
  const standardWidth = 375
  // 3. 定义标准屏幕的根元素字体大小 假设100px  1rem=100px  10px = 0.1rem  1px 0.01rem
  const standardFontSize = 16
  // 4. 计算当前屏幕对应的根元素字体大小
  const nowFontSize = (windowWidth / standardWidth * standardFontSize) + 'px'
  // console.log(nowFontSize);
  // 5. 把当前计算的根元素的字体大小设置到html上
  document.querySelector('html').style.fontSize = nowFontSize
  // 6. 添加一个屏幕宽度变化的事件  屏幕变化就触发变化根元素字体大小计算的js
  // window.addEventListener('resize', setHtmlFontSize)
}

/**
 * 获取URL查询对象
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=#]+)=([^?&=#]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

export function setStringFormat() {
  String.prototype.format = function() {
    if (arguments.length === 0) return null
    const args = Array.prototype.slice.call(arguments)
    return this.replace(/<%(\w+)%>/g, (m, i) => {
      if (args[i]) {
        return args[i]
      } else if (typeof args[0] === 'object') {
        return args[0][i] || null
      } else {
        return null
      }
    })
  }
}