<template>
  <div class="registration">
    <h1>Registration</h1>
    <form action="">
      <label class="label">
        <div class="label__name">login</div>
        <input class="input" v-model="login" type="text" name="login">
        <span v-if="formErrors.login">login {{ formErrors.login }}</span>
      </label>
      <label class="label">
        <div class="label__name">userName</div>
        <input class="input" v-model="userName" type="text" name="userName">

        <span v-if="formErrors.userName">userName {{ formErrors.userName }}</span>
      </label>
      <label class="label">
        <div class="label__name">password</div>
        <input class="input" v-model="password" type="password" name="password">
        <span v-if="formErrors.password">password {{ formErrors.password }}</span>
      </label>
      <button type="button" @click="registration">join</button>
    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {mapActions, mapState} from 'vuex'

export default defineComponent({
  name: 'Registration',
  data() {
    return {
      login: '',
      userName: '',
      password: ''
    }
  },
  computed: {
    ...mapState([
      'errors'
    ]),
    formErrors() {
      const errors = {
        login: null,
        userName: null,
        password: null,
      }

      const errorsArr = this.errors.registrationRequest?.errors

      if (Array.isArray(errorsArr)) {
        const loginError = errorsArr.find(err => err.instancePath.startsWith('/login'))

        if (loginError) {
          errors.login = loginError.message
        }

        const userNameError = errorsArr.find(err => err.instancePath.startsWith('/userName'))

        if (userNameError) {
          errors.userName = userNameError.message
        }

        const passwordError = errorsArr.find(err => err.instancePath.startsWith('/password'))

        if (passwordError) {
          errors.password = passwordError.message
        }
      }

      return errors
    }
  },
  methods: {
    ...mapActions(['registrationRequest']),

    registration() {
      this.registrationRequest({login: this.login, userName: this.userName, password: this.password}).then(() => {
        this.$nextTick(() => {
          if (!this.errors.registrationRequest) {
            this.$router.push({path: '/'})
          }
        })
      })
    }
  }
});
</script>

