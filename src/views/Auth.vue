<template>
  <div class="auth">
    <h1>AuthPage</h1>
    <form action="">
      <label class="label">
        <input class="input" v-model="user.login" type="text" name="login">
        <div class="label__name">login</div>
      </label>
      <label class="label">
        <input class="input" v-model="user.password" type="password" name="password">
        <div class="label__name">password</div>
      </label>
      <button type="button" @click="authRequest()">join</button>
    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import axios from 'axios'

export default defineComponent({
    name: 'Auth',
    data() {
        return {
            user: {
                login: null,
                password: null
            }
        }
    },
    mounted(): void {
        this.authRequest()
    },
    methods: {
        authRequest() {
            console.log('submit', this.user)
            axios.post('http://localhost:8000/auth', this.user)
        }
    }
});
</script>
