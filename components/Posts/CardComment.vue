<template>
    <div v-if="profile" class="comment-ctn">
        <img class="avatar-comment" src="/icons/avatar.jpg" alt="">
        <div class="content-ctn">
            <NuxtLink class="comment-name" :to="`/profiles/user/${profile.id}`">
              {{ profile.name }}
              <div class="comment-date">{{ $date.get(commentProp.created_at) }}</div>
            </NuxtLink>
            <div class="comment-content">{{ commentProp.content }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { IPostCommentRes } from '~/types/post'
import type { IProfileInfoRes } from '~/types/profile'

export default Vue.extend({
  props: {
    commentProp: {
      type: Object as PropType<IPostCommentRes>,
      required: true,
    },
  },
  data(){
    return {
      profile: undefined as IProfileInfoRes | undefined,
    }
  },
  async beforeMount(){
    try {
      this.profile = await this.$getUser(this.commentProp.profile_id)
    } catch (error) {
      this.$log.error(error)
    }
  },
})
</script>

<style scoped>

.comment-ctn {
    display: flex;
    align-items: center;
    padding: 12px 0px;
}

.avatar-comment {
    width: 32px;
    height: 32px;
    object-fit: cover;
    border: 1px solid #d1d7d7;
    border-radius: 50%;
    margin-top: -12px;
    margin-left: 6px;
}

.content-ctn {
    margin-left: 12px;
    background: #f5f5f5;
    width: 100%;
    padding: 6px 12px;
    border-radius: 4px;
}

.comment-name {
    color: #504f57;
    font-weight: 500;
    font-size: 15px;
}

.comment-content {
    color: rgb(26, 26, 26);
    font-size: 15px;
}

.comment-date {
  clear: both;
  font-size: 11px;
  letter-spacing: 0.01em;
  color: #525252;
  display: inline-flex;
  align-items: center;
  height: 22px;
  font-weight: 400;
  margin-left: 4px;
}
</style>