import './styles/main.less'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'
import {store, storeInjectionKey} from './store'


createApp(App).use(createPinia()).use(store, storeInjectionKey).use(router).mount('#app')
