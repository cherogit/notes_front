<template>
  <div class="auth">
    <h1>AuthPage</h1>
    <form action="">
      <label class="label">
        <div class="label__name">login</div>
        <input class="input" v-model="login" type="text" name="login">
        <span v-if="formErrors.login">Поле login {{ formErrors.login }}</span>
      </label>
      <label class="label">
        <div class="label__name">password</div>
        <input class="input" v-model="password" type="password" name="password">
        <span v-if="formErrors.password">Поле password {{ formErrors.password }}</span>
      </label>
      <button class="btn btn--colored" type="button" @click="authorization">join</button>
    </form>
    <p v-if="errors.authRequest">
      {{ errors.authRequest }}
    </p>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {mapActions, mapState} from 'vuex'

export default defineComponent({
  name: 'Auth',
  data() {
    return {
      login: '',
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
        password: null,
        // message: this.errors.authRequest?.message || null,
      }

      const errorsArr = this.errors.authRequest?.errors

      if (Array.isArray(errorsArr)) {
        const loginError = errorsArr.find(err => err.instancePath.startsWith('/login'))

        if (loginError) {
          errors.login = loginError.message
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
    ...mapActions(['authRequest']),
    authorization() {
      this.authRequest({login: this.login, password: this.password}).then(() => {
        this.$nextTick(() => {
          if (!this.errors.authRequest) {
            this.$router.push({path: '/'})
          }
        })
      })
    }
  }
})
</script>

<style lang="less">
form {
  margin-top: 40px;
}

label {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 16px;

  div {
    width: 100%;
    margin-bottom: 4px;
    font-size: 14px;
  }

  span {
    display: block;
    margin-left: 8px;
    color: maroon;
    font-size: 12px;
  }
}
</style>
