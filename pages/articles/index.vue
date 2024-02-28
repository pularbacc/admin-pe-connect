<template>
	 <div class="page-detail">
        <div class="page-header">
            <div class="page-header-name">Articles</div>
        </div>
        <div class="page-body">
            <table class="tableManager">
                <tr class="hidden-sm">
                    <th>Title</th>
                    <th>Description</th>
                    <th>Likes</th>
                    <th>Comments</th>
                    <th>Created at</th>
                </tr>
                <tr v-for="article of articles" :key="article.id">
                    <td data-title="Title">
                        <div class="table-content-long">
                            <NuxtLink :to="`/articles/${article.id}`">{{ article.title }}</NuxtLink>
                        </div>
                    </td>
                    <td data-title="Description">
                        <div class="table-content-long">
                            {{ article.description }}
                        </div>
                    </td>
                    <td data-title="Likes">{{ article.article_likes.length }}</td>
                    <td data-title="Comments">{{ article.article_comments.length }}</td>
                    <td data-title="Created At">{{  $date.get(article.created_at) }}</td>
                 
                </tr>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IArticleRes } from '~/types/article'

export default Vue.extend({
  data() {
    return {
      articles: [] as Array<IArticleRes>,
    }
  },
  async beforeMount() {
    try {
      await this.$api.article.getListArticle().then(res => {
        this.articles = res
      })
    } catch (error) {
      this.$log.error(error)
    }
  },
})
</script>

<style scoped></style>
