<template>
    <div class="page-detail">
        <div class="page-header">
            <div class="page-header-name">Posts</div>
        </div>
        <div class="page-body">
            <table class="tableManager">
                <tr class="hidden-sm">
                    <th>Name</th>
                    <th>Description</th>
                    <th>Birthday</th>
                    <th>Gender</th>
                    <th>Created at</th>
     
                </tr>
                <tr v-for="pet of pets" :key="pet.id">
                    <td data-title="Name">
                       <NuxtLink :to="`/pets/${pet.id}`">{{ pet.name }}</NuxtLink>
                    </td>
                    <td data-title="Description">
                        <div class="table-content-long">
                            {{ pet.description }}
                        </div>
                    </td>
                    <td data-title="Birthday">{{ $date.get(pet.birthday) }}</td>
                    <td data-title="Gender">
                      <span v-if="pet.gender">Male</span>
                      <span v-else>Female</span>
                    </td>
                    <td data-title="Created At">{{  $date.get(pet.created_at) }}</td>
               
                </tr>
            </table>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { IPetRes } from '~/types/pet'

export default Vue.extend({
  data() {
    return {
      pets: [] as Array<IPetRes>,
    }
  },
  async beforeMount() {
    try {
      await this.$api.pet.getPets().then(res => {
        this.pets = res
      })
    } catch (error) {
      this.$log.error(error)
    }
  },
})
</script>

<style scoped></style>
