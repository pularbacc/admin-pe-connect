<template>
    <div class="page-detail">
        <div class="page-header">
            <div class="page-header-name">Posts</div>
        </div>
        <div class="page-body">
            <table class="tableManager">
                <tr class="hidden-sm">
                    <th>Title</th>
                    <th>Content</th>
                    <th>Likes</th>
                    <th>Comments</th>
                    <th>Created at</th>
           
                </tr>
                <tr v-for="post of posts" :key="post.id">
                    <td data-title="Title">
                        <div class="table-content-long">
                           <NuxtLink :to="`/posts/${post.id}`"> {{ post.title }}</NuxtLink>
                        </div>
                    </td>
                    <td data-title="Content">
                        <div class="table-content-long">
                            {{ post.content }}
                        </div>
                    </td>
                    <td data-title="Likes">{{ post.post_likes.length }}</td>
                    <td data-title="Comments">{{ post.post_comments.length }}</td>
                    <td data-title="Created At">{{  $date.get(post.created_at) }}</td>

                </tr>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IPostRes } from '~/types/post'

export default Vue.extend({
  data() {
    return {
      posts: [] as Array<IPostRes>,
    }
  },
  async beforeMount() {
    try {
      await this.$api.post.getListPost().then(res => {
        this.posts = res
      })
    } catch (error) {
      this.$log.error(error)
    }
  },
})
</script>

<style scoped></style>
