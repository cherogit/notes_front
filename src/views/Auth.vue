<template>
  <div class="auth">
    <h1>AuthPage</h1>
    <form action="">
      <label class="label">
        <input class="input" v-model="login" type="text" name="login">
        <div class="label__name">login</div>
      </label>
      <label class="label">
        <input class="input" v-model="password" type="password" name="password">
        <div class="label__name">password</div>
      </label>
      <button type="button" @click="authRequest()">join</button>
    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'Auth',
  data() {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    authRequest() {
      this.$store.dispatch('authRequest', {login: this.login, password: this.password})
    }
  }
})
</script>
