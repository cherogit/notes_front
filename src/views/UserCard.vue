<template>
  <div class="user-card">
    <div class="user-card__column">
      {{ user.login }}
    </div>
    <label
      v-for="(role, index) of ROLES"
      :key="index"
      class="user-card__column"
    >
      <input
        type="checkbox"
        :name="role"
        :checked="user.roles.includes(role)"
        @change="changeUserRole(role)"
      >
    </label>
    <div class="user-card__column">
      <button
        class="btn btn--success"
        type="button"
        :disabled="!this.isRolesDiffer"
        @click="saveUserRoles"
      >
        save
      </button>
    </div>
  </div>
</template>

<script lang="ts">
// import Vue from 'vue'
import {defineComponent} from 'vue'
import {ROLES} from '@/constants'
import {mapActions} from 'vuex'

export interface UpdatedUser {
  login: string
  roles: ROLES[]
  isRolesDiffer: boolean
}

export default defineComponent({
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      default: () => {
      }
    }
  },
  emits: {
    changeUserRoles: (updatedUser: UpdatedUser) => {
    }
  },
  data() {
    return {
      userRoles: [...this.user.roles],

      ROLES
    }
  },
  computed: {
    isRolesDiffer(): boolean {
      if (this.user.roles.length !== this.userRoles.length) return true
      if (this.user.roles.length === 0) return false

      return !this.user.roles.every((role: ROLES) => this.userRoles.includes(role))
    },
  },
  methods: {
    ...mapActions(['updateRoles']),

    changeUserRole(role: ROLES) {
      const existingRoleIndex = this.userRoles.findIndex(userRole => userRole === role)

      if (existingRoleIndex === -1) {
        this.userRoles.push(role)
      } else {
        this.userRoles.splice(existingRoleIndex, 1)
      }

      this.$emit('changeUserRoles', {
        login: this.user.login,
        roles: this.userRoles,
        isRolesDiffer: this.isRolesDiffer
      })
    },
    saveUserRoles() {
      if (!this.isRolesDiffer) {
        return
      } else {
        this.updateRoles([{id: this.user._id, roles: this.userRoles}])
          .then(() => {
            alert('roles updated')
          })
          .catch(() => {
            alert('error')
          })
      }
    }
  }
})
</script>

<style lang="less">
.user-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-card__column {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 70px;
  margin: 0;
  border-bottom: 1px solid #282828;
  text-align: center;

  &:not(:last-child) {
    border-right: 1px solid #282828;
  }
}
</style>