<template>
  <div>
    <h2>404: Not Found</h2>
    <br>
    <router-link class="btn btn--colored" to="/">home</router-link>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'NotFound',
});
</script>