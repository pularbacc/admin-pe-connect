<template>
    <div class="page-detail">
        <div class="page-header">
            <div class="page-header-name">Users</div>
        </div>
        <div class="page-body">
            <table class="tableManager">
                <tr class="hidden-sm">
                    <th>Name</th>
                    <th>Description</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Birthday</th>
                </tr>
                <tr v-for="profile of profiles" :key="profile.id">
                    <td data-title="Name">
                      <NuxtLink :to="`/profiles/${profile.id}`">{{ profile.name }}</NuxtLink>
                    </td>
                    <td data-title="Description">
                      <div class="table-content-long">{{ profile.description }}</div>
                    </td>
                    <td data-title="Phone">{{ profile.phone }}</td>
                    <td data-title="Address">{{ profile.address }}</td>

                    <td data-title="Birthday">{{  $date.get(profile.birthday) }}</td>

                </tr>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IProfileRes } from '~/types/profile'

export default Vue.extend({
  data() {
    return {
      profiles: [] as Array<IProfileRes>,
    }
  },
  async beforeMount() {
    try {
      await this.$api.profile.getAll().then(res => {
        this.profiles = res
      })
    } catch (error) {
      this.$log.error(error)
    }
  },
})
</script>

<style scoped></style>
