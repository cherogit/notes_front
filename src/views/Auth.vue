<template>
  <div class="auth">
    <h1>AuthPage</h1>
    <form action="">
      <label class="label">
        <div class="label__name">login</div>
        <input class="input" v-model="login" type="text" name="login">
        <span v-if="authorization.isRejected && formErrors.login">Поле login {{ formErrors.login }}</span>
      </label>
      <label class="label">
        <div class="label__name">password</div>
        <input class="input" v-model="password" type="password" name="password">
        <span v-if="authorization.isRejected && formErrors.password">Поле password {{ formErrors.password }}</span>
      </label>
      <button class="btn btn--colored" type="button" @click="auth">join</button>
    </form>
    <div v-if="authorization.isRejected">
      <h2>{{ authorization.error?.status }} {{ authorization.error?.message }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue'
import {useStore} from '@/store'
import {useApiWrapper} from '@/util/hooks'
import {useRouter} from 'vue-router'

const useAuth = (loginForm: { login: string, password: string }) => {
  const main = useStore()
  const doLogin = (loginForm: Parameters<typeof main.authRequest>[0]) => main.authRequest(loginForm)
  const authorization = useApiWrapper(doLogin)

  return {
    authorization
  }
}

export default defineComponent({
  name: 'Auth',
  setup() {
    const router = useRouter()
    const login = ref('')
    const password = ref('')

    const {authorization} = useAuth({login: login.value, password: password.value})
    const formErrors = computed(() => {
      const fieldsErrors = {
        login: null,
        password: null
      }
      const authErrors = authorization.error

      if (Array.isArray(authErrors)) {
        const loginError = authErrors.find(err => err.instancePath.startsWith('/login'))

        if (loginError) {
          fieldsErrors.login = loginError.message
        }

        const passwordError = authErrors.find(err => err.instancePath.startsWith('/password'))

        if (passwordError) {
          fieldsErrors.password = passwordError.message
        }
      }

      return fieldsErrors
    })

    const auth = async () => {
      await authorization.run({login: login.value, password: password.value})

      if (!authorization.error) {
        await router.push({path: '/'})
      }
    }

    return {
      login,
      password,
      authorization,
      formErrors,
      auth
    }
  }
})
</script>

<style lang="less">
form {
  margin-top: 40px;
}

label {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 16px;
  font-size: 12px;

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
