import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { NavBar, Toast } from 'vant'
import { setHtmlFontSize, setStringFormat } from '@/utils/index'
import '@vant/touch-emulator'

Toast.setDefaultOptions({ duration: 3000 })
Vue.use(NavBar).use(Toast)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// 设置字符串格式化
setStringFormat()
// 移动端屏幕适配
setHtmlFontSize()
// 添加一个屏幕宽度变化的事件  屏幕变化就触发变化根元素字体大小计算的js
window.addEventListener('resize', setHtmlFontSize)
// 设置标题
document.title = '赶鸭网'