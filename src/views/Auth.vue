<template>
  <div class="auth">
    <h1>AuthPage</h1>
    <form action="http://localhost:8000/auth" method="POST">
      <label class="label">
        <input class="input" type="text" name="login">
        <div class="label__name">login</div>
      </label>
      <label class="label">
        <input class="input" type="password" name="password">
        <div class="label__name">password</div>
      </label>
      <button>join</button>
    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'Auth',
});
</script>
