<template>
    <div v-if="post" class="gcard post">
        <div v-if="userPost" class="post-avatar">
            <NuxtLink :to="`/profiles/user/${userPost.id}`" class="user-link">
                <img class="card-avatar" :src="userPost.avatar ? $linkFile(userPost.avatar) : '/icons/avatar.jpg'" />
                <div class="card-name-ctn">
                    <span class="post-name">{{ userPost.name }}</span>
                    <span class="post-time">{{ $date.get(post.created_at) }}</span>
                </div>
            </NuxtLink>
            
            <img class="post-more" src="/icons/more-ver.svg">
        </div>

        <div class="post-body">
            <div class="post-header">
                {{ post.title }}
            </div>
            <div class="post-content">
                {{ post.content }}
            </div>
            <!-- <img class="post-img" src="https://www.focus2move.com/wp-content/uploads/2020/01/Tesla-Roadster-2020-1024-03.jpg" alt="" /> -->

        </div>
        <div v-if="post.pets && post.pets.length > 0" class="post__footer">
            <Nuxt-link v-for="pet of post.pets" :key="pet.id" class="pet-post" :to="`/profiles/pet/${pet.id}`">
              <CardPet :id-pet="pet.id"/>
            </Nuxt-link>
        </div>
        <div class="post__footer">
            <span class="action-post">
                <img v-if="!isLikePost" class="action-post-icn" src="/icons/upvote.svg" @click="likePost">
                <img v-else class="action-post-icn" src="/icons/upvote-fill.svg" @click="likePost">

                <span v-if="post.post_likes" class="action-post-count">{{ post.post_likes.length }}</span>
            </span>
            <!-- <span class="action-post">
                <img class="action-post-icn" src="/icons/downvote.svg">
                <span class="action-post-count">1</span>
            </span> -->
            <span class="action-post">
                <img class="action-post-icn" src="/icons/comment.svg">
                <span class="action-post-count">{{ post.post_comments.length }}</span>
            </span>
            <img class="action-post-share" src="/icons/share.svg">
        </div>
       
        <div class="post__footer">
            <img src="/icons/avatar.jpg" class="card-avatar">
            <input 
              v-model="contentComment" 
              type="text" 
              class="card-inp inp-comment"
              placeholder="Add an comment..."
              @keyup.enter="addComment"
            >
        </div>
        <div v-if="post.post_comments && post.post_comments.length > 0" class="post-comment-ctn">
            <CardComment v-for="comment of post.post_comments" :key="comment.id" :comment-prop="comment"/>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import CardComment from './CardComment.vue'
import CardPet from '~/components/Pets/CardPet.vue'
import type { IPostRes } from '~/types/post'
import type { IProfileInfoRes } from '~/types/profile'


export default Vue.extend({
  components: { 
    CardPet,
    CardComment,
  },
  props: {
    idPost: {
      type: Number,
      default: undefined,
    },
    postProp: {
      type: Object as PropType<IPostRes>,
      default: undefined,
    },
  },
  data() {
    return {
      userPost: undefined as IProfileInfoRes | undefined,
      post: undefined as IPostRes | undefined,
      contentComment: '',
    }
  },
  computed: {
    isLikePost() {
      if (this.$auth.user && this.$auth.user.profile_id) {
        const indexLike = this.post?.post_likes.findIndex(item => item.profile_id === this.$auth.user?.profile_id)
        if (indexLike !== undefined && indexLike >= 0) {
          return true
        }
      }
      return false
    },
  },
  async beforeMount() {
    if (this.postProp) {
      this.post = this.postProp
      this.userPost = await this.$getUser(this.post.profile_id)
    }
    else if (this.idPost) {
      try {
        await this.$api.post.detailPost(this.idPost).then(async (res) => {
          this.post = res
          this.userPost = await this.$getUser(this.post.profile_id)
        })
      }
      catch (error) {
        this.$log.error(error)
      }
    }
  },
  methods: {
    async likePost() {
      try {
        await this.$api.post.likePost(this.post?.id as number).then(res => {
          this.$log.log(res)
          // @ts-ignore
          this.post.post_likes = res
        })
      }
      catch (error) {
        this.$log.error(error)
      }
    },
    async addComment(){
      try {
        await this.$api.post.commentPost(this.post?.id as number, {
          content: this.contentComment,
        }).then(res => {
          this.contentComment = ''
          this.post?.post_comments.unshift(res)
        })
      } catch (error) {
        this.$log.error(error)
      }
    },
  },
})
</script>

<style scoped>
.post {}

.post__footer {
    display: flex;
    margin-top: 12px;
}

.post__footer + .post__footer {
    border-top: var(--dividerStyle);
    padding-top: 12px;
}

.post-header {
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.02em;
    font-weight: 500;
    margin-bottom: 6px;
}

.card-avatar {
    width: 40px;
    height: 40px;
}
.post-content {
    color: rgb(26, 26, 26);
    font-size: 15px;
}

.post-img {
    width: 100%;
    margin-top: 12px;
    border-radius: var(--borderRadius);
}

.post-body {
    margin: 8px 0px;
    padding: 8px 0px;
    border-top: var(--dividerStyle);
    border-bottom: var(--dividerStyle);
}

.post-avatar {
    display: flex;
    align-items: center;
}

.card-name-ctn {
    display: flex;
    flex-direction: column;
    margin-left: 12px;
}

.post-time {
    font-size: 11px;
    letter-spacing: 0.01em;
    color: #525252;
    display: inline-flex;
    align-items: center;
    height: 22px;
}

.post-name {
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.02em;
    color: #363445;
    font-weight: 500;
   
}

.post-more {
    margin-left: auto;
}

.inp-comment {
    margin-left: 12px;
}

.action-post {
    display: flex;
    align-items: center;
    margin-right: 16px;
}

.action-post-icn {
    margin-right: 4px;
    cursor: pointer;
}

.action-post-count {
    font-size: 15px;
    line-height: 28px;
    letter-spacing: 0.02em;
    color: #525252;
    font-weight: 400;
}

.action-post-share {
    margin-left: auto;
}

.user-link {
    display: flex;
}

.pet-post .pet-ctn {
	clear: both;
  display: inline-flex;
  border: none;
  background-color: #b3dfdc;
  border-radius: 12px;
  padding: 4px 8px;
  padding-right: 12px;
  margin-right: 12px;
}

.post-comment-ctn {
  border-top: var(--dividerStyle);
  margin-top: 12px;
}
</style>