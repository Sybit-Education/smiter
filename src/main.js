import { createApp } from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'


import panZoom from 'vue-panzoom'


const app = createApp(App)
app.use(Antd)
app.use(panZoom)
app.mount('#app')
