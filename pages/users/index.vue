<template>
    <div class="page-detail">
        <div class="page-header">
            <div class="page-header-name">Users</div>
        </div>
        <div class="page-body">
            <table class="tableManager">
                <tr class="hidden-sm">
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created at</th>
                </tr>
                <tr v-for="user of users" :key="user.id">
                    <td data-title="Email">
                       {{ user.email }}
                    </td>
                    <td>{{ user.role }}</td>
                 
                    <td data-title="Created At">{{  $date.get(user.created_at) }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IUserRes } from '~/types/auth'

export default Vue.extend({
  data() {
    return {
      users: [] as Array<IUserRes>,
    }
  },
  async beforeMount() {
    try {
      await this.$api.user.getUsers().then(res => {
        this.users = res
      })
    } catch (error) {
      this.$log.error(error)
    }
  },
})
</script>

<style scoped></style>
