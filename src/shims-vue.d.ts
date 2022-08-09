/* eslint-disable */
declare module '*.vue' {
  import type {DefineComponent} from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "*.svg" {
  const content: any
  export default content
}

import {Store} from './store'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store
    asyncMethods: { [key: string]: any }
  }
}
