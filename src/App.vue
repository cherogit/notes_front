<template>
  <header class="header">
    <div class="header__wrapper container">
      <nav class="header__nav nav">
        <router-link class="nav__link" to="/">Home</router-link>
        <router-link class="nav__link" to="/auth">Auth</router-link>
        <router-link class="nav__link" to="/registration">Registration</router-link>
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
    <div v-else-if="!!$store.state.errors.getUserInfo">
      <h2>{{ $store.state.errors.getUserInfo.status }} <br> {{ $store.state.errors.getUserInfo.data }}</h2>
      <br>

      <router-link class="btn btn--colored" to="/auth">authorization</router-link>
    </div>
    <h2 v-else>все пошло не по плану.</h2>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {mapActions, mapState} from 'vuex'

export default defineComponent({
  name: 'App',
  mounted() {
    if (!this.user) {
      this.getUserInfo()
    }
  },
  computed: {
    ...mapState([
      'user'
    ]),
    isGeneralPages(): boolean {
      return ['/auth', '/registration'].includes(this.$route.path)
    },
  },
  methods: {
    ...mapActions(['getUserInfo', 'logoutRequest']),

    logout() {
      this.logoutRequest()
      this.$router.push({path: '/'})
    }
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
