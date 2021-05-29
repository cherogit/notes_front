<template>
  <header class="header">
    <div class="header__wrapper container">
      <nav class="header__nav nav">
        <router-link class="nav__link" to="/">Home</router-link>
        <router-link class="nav__link" to="/self">Self</router-link>
      </nav>
      <div class="header__user">
        <template v-if="user">
          <span class="header__user-info">{{ user.userName }}</span>
          <router-link class="btn btn--colored" to="/logout">logout</router-link>
        </template>
        <router-link v-else class="btn btn--colored" to="/auth">authorization</router-link>
      </div>
    </div>
  </header>

  <div class="container">
    <div v-if="!!user || isGeneralPages">
      <router-view/>
    </div>
    <div v-else-if="!!$store.state.errors.getUserInfo">
      <h2>{{ $store.state.errors.getUserInfo.message }}</h2>
      <br>

      <router-link class="btn btn--colored" to="/auth">authorization</router-link>
    </div>
    <h2 v-else>все пошло не по плану...</h2>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {User} from '@/typings'

export default defineComponent({
  name: 'App',
  data() {
    return {
      user: null as User | null,
    }
  },
  mounted() {
    console.log('app', this.$store.state)

    if (!this.$store.state) {
      this.$store.commit('setError', {action: 'getUserInfo', error: null})
      this.$store.dispatch('getUserInfo')
      this.user = this.$store.state
    } else {
      // this.user = this.$store.state
    }
  },
  computed: {
    isGeneralPages(): boolean {
      return ['/auth', '/registration'].includes(this.$route.path)
    },
  }
});
</script>

<style lang="less">

.header {
  margin-bottom: 50px;
  border-bottom: 1px solid white;
}

.header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
}

.nav__link {
  color: white;
  text-decoration: none;

  &:hover {
    color: tomato;
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
</style>
