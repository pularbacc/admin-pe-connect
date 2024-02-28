<template>
	 <div class="page-detail">
        <div class="page-header">
            <div class="page-header-name">NotiSystems</div>
            <NuxtLink to="/noti-systems/create" class="btn btn--dark btn-create">Create</NuxtLink>
        </div>
        <div class="page-body">
            <table class="tableManager">
                <tr class="hidden-sm">
                    <th>Title</th>
                    <th>Content</th>
                    <th>Created at</th>
                    <th>Action</th>
                </tr>
                <tr v-for="notiSystem of notiSystems" :key="notiSystem.id">
                    <td data-title="Title">
                        <div class="table-content-long">
                            {{ notiSystem.title }}
                        </div>
                    </td>
                    <td data-title="Content">
                        <div class="table-content-long">
                            {{ notiSystem.content }}
                        </div>
                    </td>
          
                    <td data-title="Created At">{{  $date.get(notiSystem.created_at) }}</td>
                    <td data-title="Action">
                      <button class="btn btn--light table-btn" @click="remove(notiSystem.id)">Remove</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { INotiSystemRes } from '~/types/notiSystem'

export default Vue.extend({
  data() {
    return {
      notiSystems: [] as Array<INotiSystemRes>,
    }
  },
  async beforeMount() {
    try {
      await this.$api.notiSystem.getListNotiSystem().then(res => {
        this.notiSystems = res
      })
    } catch (error) {
      this.$log.error(error)
    }
  },
  methods: {
    async remove(id: number){
      try {
        await this.$api.notiSystem.deleteNotiSystem(id).then(_ => {
          const idx = this.notiSystems.findIndex(item => item.id === id)
          if(idx && idx >= 0){
            this.notiSystems.splice(idx, 1)
          }
        }) 
      } catch (error) {
        this.$log.error(error)
      }
    },
  },
})
</script>

<style scoped>
.btn-create {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  margin-left: auto;
}
</style>
