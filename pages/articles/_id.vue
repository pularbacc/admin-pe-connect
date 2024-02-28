<template>
	<div class="page-detail">
        <div class="page-header">
            <div class="page-header-name">Detail article</div>
			<button class="btn btn--dark detail-action" @click="showBlock = true">Block</button>
        </div>
        <div class="page-body">
            <div class="gcard" v-if="data.id">
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

				<div class="detail-label">Description</div>
				<div>{{ data.description }}</div>
				<div class="detail-line"></div>

				<div class="detail-label">Count</div>
				<div>
					Likes: <b>{{ data.article_likes.length }}</b> | Comments: <b>{{ data.article_comments.length }}</b>
				</div>
				<div class="detail-line"></div>

				<div class="detail-label">Cover</div>
				<div class="cover">
					<img class="detail-img" :src="$linkFile(data.cover)" >
				</div>
				<div class="line"></div>
				<br>
			</div>
        </div>
		<PopupBlock v-if="showBlock" label="Article" action="ARTICLE" :target-id="data.id" @close="showBlock = false"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IArticleRes } from '~/types/article'
import CardUser from '~/components/Users/CardUserDetail.vue'
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
      data: {} as IArticleRes,
	  showBlock: false,
    }
  },
  async beforeMount(){
    await this.$api.article.detailArticle(this.id).then(res => {
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

.detail-img {
	max-width: 100%;
	max-height: 100%;
}
</style>
