<template>
  <header class="header">
    <div class="header__wrapper container">
      <nav class="header__nav nav">
        <router-link class="nav__link" to="/">Home</router-link>
        <template v-if="!user">
          <router-link class="nav__link" to="/auth">Auth</router-link>
          <router-link class="nav__link" to="/registration">Registration</router-link>
        </template>
        <template v-if="user">
          <router-link class="nav__link" to="/notes">Notes</router-link>
          <router-link class="nav__link" to="/users">Users</router-link>
        </template>
      </nav>
      <div class="header__user">
        <template v-if="user">
          <span class="header__user-info">{{ user.userName }}</span>
          <button class="btn btn--colored" type="button" @click="logout">logout</button>
        </template>
        <router-link v-else class="btn btn--colored" to="/auth">authorization</router-link>
      </div>
    </div>
  </header>

  <div class="container">
    <div v-if="!!user || isGeneralPages">
      <router-view/>
    </div>
    <div v-else-if="userInfoLoader.isRejected">
      <h2>{{ userInfoLoader.error?.status }} {{ userInfoLoader.error?.message }}</h2>
      <br>

      <router-link class="btn btn--colored" to="/auth">authorization</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, computed, toRefs, toRef, ref} from 'vue'
import {useStore} from '@/store/'
import {storeToRefs} from 'pinia'
import {useApiWrapper} from '@/util/hooks'
import {useRoute} from 'vue-router'

const useUser = (options: { checkOnMount: boolean }) => {
  const main = useStore()
  const {user} = storeToRefs(main)
  const userInfoLoader = useApiWrapper(main.getUserInfo)

  if (options.checkOnMount) {
    onMounted(async () => {
      if (!user.value) {
        await userInfoLoader.run()
        user.value = userInfoLoader.result
      }
    })
  }

  return {
    user, userInfoLoader
  }
}

export default defineComponent({
  name: 'App',
  setup() {
    const main = useStore()
    const route = useRoute()
    const {user, userInfoLoader} = useUser({checkOnMount: true})

    const isGeneralPages = computed(() => {
      return ['/auth', '/registration'].includes(route.path)
    })

    const logout = useApiWrapper(main.logoutRequest)

    return {user, userInfoLoader, isGeneralPages}
  }
});
</script>

<style lang="less">

.header {
  margin-bottom: 50px;
  background: rgba(40, 40, 40, 1);
  color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 6px 1px #282828;
}

.header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
}

.nav__link {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  transition: color 0.1s;

  &:hover {
    color: white;
  }

  &:not(:last-child) {
    margin-right: 40px;
  }
}

.btn {
  display: inline-block;
  text-decoration: none;

  &--colored {
    padding: 12px 24px;
    background-color: tomato;
    color: white;
  }
}

.header__user-info {
  margin-right: 8px;
}
</style>
