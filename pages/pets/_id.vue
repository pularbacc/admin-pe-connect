<template>
	<div class="page-detail">
        <div class="page-header">
            <div class="page-header-name">Detail Pet</div>
			<button class="btn btn--dark detail-action">Block</button>
        </div>
        <div class="page-body">
            <div class="gcard" v-if="data.id">
				<div class="detail-label">Name</div>
				<div>{{ data.name }}</div>
				<div class="detail-line"></div>

				<div class="detail-label">Created at</div>
				<div>{{ $date.get(data.created_at) }}</div>
				<div class="detail-line"></div>

				<div class="detail-label">Owner</div>
				<div v-if="data.profile_id">
					<CardUser :id-profile="data.profile_id"/>
				</div>
				<div class="detail-line"></div>

				<div class="detail-label">Description</div>
				<div>{{ data.description }}</div>
				<div class="detail-line"></div>

				<div class="detail-label">Specie</div>
				<div>{{ data.specie_type }}</div>
				<div class="detail-line"></div>

				<div class="detail-label">Birthday</div>
				<div>{{ $date.get(data.birthday) }}</div>
				<div class="detail-line"></div>
			</div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CardUser from '~/components/Users/CardUserDetail.vue'
import { IPetRes } from '~/types/pet'

export default Vue.extend({
  components: {
    CardUser,
  },
  asyncData({ params }) {
    const id = params.id
    return { id }
  },
  data(){
    return {
      data: {} as IPetRes,
    }
  },
  async beforeMount(){
    await this.$api.pet.detailProfilePet(this.id).then(res => {
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
