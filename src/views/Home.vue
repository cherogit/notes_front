<template>
  <div class="home">
    homePage
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'Home',
  data() {
    return {
      user: {}
    }
  },
  mounted() {
    console.log('mounted')
    // this.fetchUserInfo()
  },
  // asyncMethods: {
  //   async fetchUserInfo() {
  //     // this.servers = await getServers()
  //     console.log(123)
  //   }
  // }
});
</script>
