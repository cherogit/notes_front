<template>
  <div class="registration">
    <h1>Registration</h1>
    <form action="">
      <label class="label">
        <input class="input" v-model="login" type="text" name="login">
        <div class="label__name">login</div>
      </label>
      <label class="label">
        <input class="input" v-model="userName" type="text" name="userName">
        <div class="label__name">userName</div>
      </label>
      <label class="label">
        <input class="input" v-model="password" type="password" name="password">
        <div class="label__name">password</div>
      </label>
      <button type="button" @click="registration">join</button>
    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {mapActions} from 'vuex'

export default defineComponent({
  name: 'Registration',
  data() {
    return {
      login: '',
      userName: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['registrationRequest']),
    registration() {
      this.registrationRequest({login: this.login, userName: this.userName, password: this.password})
      this.$router.push({ path: '/' })
    }
  }
});
</script>

