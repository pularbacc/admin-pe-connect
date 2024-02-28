<template>
	<div class="page-detail">
        <div class="page-header">
            <div class="page-header-name">Detail post</div>
			<button class="btn btn--dark detail-action" @click="showBlock = true">Block</button>
        </div>
        <div class="page-body">
            <div v-if="data.id" class="gcard">
				<div class="detail-label">Title</div>
				<div>{{ data.title }}</div>
				<div class="detail-line"></div>

				<div class="detail-label">Created at</div>
				<div>{{ $date.get(data.created_at) }}</div>
				<div class="detail-line"></div>

				<div class="detail-label">Owner</div>
				<div v-if="data.profile_id">
					<CardUser :id-profile="data.profile_id"/>
				</div>
				<div class="detail-line"></div>

				<div class="detail-label">Content</div>
				<div v-html="data.content"></div>
				<div class="detail-line"></div>

				<div class="detail-label">Count</div>
				<div>
					Likes: <b>{{ data.post_likes.length }}</b> | Comments: <b>{{ data.post_comments.length }}</b>
				</div>
				<div class="detail-line"></div>
				<br>
			</div>
        </div>
		<PopupBlock v-if="showBlock" label="Post" action="POST" :target-id="data.id" @close="showBlock = false"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CardUser from '~/components/Users/CardUserDetail.vue'
import { IPostRes } from '~/types/post'
import PopupBlock from '~/components/Common/PopupBlock.vue'

export default Vue.extend({
  components: {
    CardUser,
    PopupBlock,
  },
  asyncData({ params }) {
    const id = params.id
    return { id }
  },
  data(){
    return {
      data: {} as IPostRes,
	  showBlock: false,
    }
  },
  async beforeMount(){
    await this.$api.post.detailPost(this.id).then(res => {
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
