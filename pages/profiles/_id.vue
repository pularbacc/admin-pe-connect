<template>
	<div class="page-detail">
        <div class="page-header">
            <div class="page-header-name">Detail profile</div>
			<button class="btn btn--dark detail-action" @click="showBlock = true">Block</button>
        </div>
        <div class="page-body">
            <div class="gcard" v-if="data.id">
				<div class="detail-label">Name</div>
				<div>{{ data.name }}</div>
				<div class="detail-line"></div>

				<div class="detail-label">Created at</div>
				<div>{{ $date.get(data.created_at) }}</div>
				<div class="detail-line"></div>

				<div class="detail-label">Description</div>
				<div>{{ data.description }}</div>
				<div class="detail-line"></div>

				<div class="detail-label">Phone</div>
				<div>{{ data.phone }}</div>
				<div class="detail-line"></div>

				<div class="detail-label">Address</div>
				<div>{{ data.address }}</div>
				<div class="detail-line"></div>

				<div class="detail-label">Birthday</div>
				<div>{{ $date.get(data.birthday) }}</div>
				<div class="detail-line"></div>
			</div>
        </div>
		<PopupBlock v-if="showBlock" label="Profile" action="USER" :target-id="data.id" @close="showBlock = false"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IProfileRes } from '~/types/profile'
import PopupBlock from '~/components/Common/PopupBlock.vue'

export default Vue.extend({
  components: {
	PopupBlock,
  },
  asyncData({ params }) {
    const id = params.id
    return { id }
  },
  data(){
    return {
      data: {} as IProfileRes,
	  showBlock: false,
    }
  },
  async beforeMount(){
    await this.$api.profile.detailProfile(this.id).then(res => {
      this.data = res
    })
  },
})
</script>

<style scoped>
.cover {
	max-width: 250px;
	max-height: 250px;
}
</style>
