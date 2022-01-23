<template>
  <div class="user-card">
    <div class="user-card__column">
      {{ user.login }}
      <hr>
      {{ userRoles }}
      <hr>
      isUpdate: {{ isRolesDiffer }}
    </div>
    <div
      v-for="(role, index) of ROLES"
      :key="index"
      class="user-card__column"
    >
      <label>
        <input
          type="checkbox"
          :name="role"
          :checked="user.roles.includes(role)"
          @change="changeUserRole(role)"
        >
      </label>
    </div>
    <div class="user-card__column">
      <button
        class="btn btn--success"
        type="button"
        @click="saveUserRoles"
      >save</button>
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
    changeUserRoles: (updatedUser: UpdatedUser) => {}
  },
  data() {
    return {
      // userRoles: Vue.util.extend({}, this.user.roles),
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

      // console.log(existingRoleIndex, role)

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
        alert('Сначала поменяй роли')
        return
      } else {
        this.updateRoles([this.user._id, this.userRoles]).then(() => {
          alert('then')
        }).catch(() => {
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
}

.user-card__column {
  width: 20%;
  padding: 25px 0;
  border-bottom: 1px solid #282828;
  text-align: center;

  &:not(:last-child) {
    border-right: 1px solid #282828;
  }
}
</style>