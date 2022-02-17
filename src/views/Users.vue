<template>
  <div class="users">
    <h2>Users</h2>
    <h3 v-if="Object.keys(this.users).length === 0">
      user list is empty
    </h3>
    <form v-else action="">
      <div class="users__columns">
        <h3>login</h3>
        <h3
            v-for="(role, index) of ROLES"
            :key="index"
        >
          {{ role }}
        </h3>
        <h3></h3>
      </div>

      <user-card
          v-for="user in users"
          :key="user._id"
          :user="user"
          @changeUserRoles="changeUserRoles"
          @saveUserRoles="updatedUser => saveRoles(updatedUser)"
      ></user-card>
    </form>
    <br>
    <button
        class="btn btn--colored"
        type="button"
        :disabled="!updatedUsers.length"
        @click="saveRoles(updatedUsers)"
    >
      save all
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {mapActions, mapState} from 'vuex'
import {ROLES} from '@/constants'
import UserCard, {UpdatedUser} from '@/views/UserCard.vue'

export default defineComponent({
  name: 'Users',
  components: {UserCard},
  data() {
    return {
      updatedUsers: [] as UpdatedUser[],

      ROLES
    }
  },
  async mounted() {
    if (Object.keys(this.users).length === 0) {
      await this.getListOfUsers()
    }
  },
  computed: {
    ...mapState(['users', 'errors']),
  },
  methods: {
    ...mapActions(['getListOfUsers', 'updateUsers']),

    changeUserRoles(updatedUser: UpdatedUser) {
      console.log()
      const existingUserIndex = this.updatedUsers.findIndex(user => user.login === updatedUser.login)

      if (existingUserIndex !== -1) {
        if (updatedUser.isRolesDiffer) {
          this.updatedUsers[existingUserIndex] = updatedUser
        } else {
          this.updatedUsers.splice(existingUserIndex, 1)
        }
      } else {
        this.updatedUsers.push(updatedUser)
      }
    },
    saveRoles(users: [{ id: string, roles: [] }]) {
      console.log('1', users)
      this.updateUsers(users)
          .then(() => {
            alert('roles updated')
          })
          .catch(() => {
            alert('error')
          })
    }
  }
})
</script>

<style lang="less">
form {
  display: block;
}

.users__columns {
  display: flex;
  justify-content: space-between;

  h3 {
    width: 20%;
    padding: 12px 0;
    border-bottom: 2px solid #282828;
    text-align: center;

    &:not(:last-child) {
      border-right: 1px solid #282828;
    }
  }
}
</style>