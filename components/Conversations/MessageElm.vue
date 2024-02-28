<template>
    <div v-if="profile" class="message-ctn">
        <img v-if="!isMyMess" class="avatar-message" src="/icons/avatar.jpg">
        <div class="content-ctn" :class="{'content-ctn-my': isMyMess}">
            <NuxtLink v-if="!isMyMess" class="message-name" :to="`/profiles/user/${profile.id}`">
              {{ profile.name }}
              <div class="message-date">{{ $date.get(messageProp.created_at) }}</div>
            </NuxtLink>
            <div v-if="isMyMess" class="message-date message-date-my">{{ $date.get(messageProp.created_at) }}</div>
            <div class="message-content" :class="{'message-content-my': isMyMess}">
              {{ messageProp.content }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { IMessageRes } from '~/types/conversation'
import type { IProfileInfoRes } from '~/types/profile'

export default Vue.extend({
  props: {
    messageProp: {
      type: Object as PropType<IMessageRes>,
      required: true,
    },
  },
  data(){
    return {
      profile: undefined as IProfileInfoRes | undefined,
    }
  },
  computed: {
    isMyMess(){
      if(this.$auth.user && this.$auth.user.profile_id){
        if(this.$auth.user.profile_id === this.messageProp.profile_id){
          return true
        }
      }
      return false
    },
  },
  async beforeMount(){
    try {
      this.profile = await this.$getUser(this.messageProp.profile_id)
    } catch (error) {
      this.$log.error(error)
    }
  },
})
</script>

<style scoped>

.message-ctn {
    display: flex;
    align-items: center;
    padding: 12px 0px;
}

.avatar-message {
    width: 32px;
    height: 32px;
    object-fit: cover;
    border: 1px solid #d1d7d7;
    border-radius: 50%;
    margin-top: -12px;
    margin-left: 12px;
}

.content-ctn {
    margin-left: 12px;
    display: flex;
    flex-direction: column;
}

.message-name {
    color: #504f57;
    font-weight: 500;
    font-size: 15px;
}

.message-content {
    color: rgb(26, 26, 26);
    font-size: 15px;
    background: #e4e6eb;
    padding: 4px 6px;
    border-radius: 4px;
}

.message-date {
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

.message-date-my {
  margin-left: auto;
}

.content-ctn-my {
  margin-left: auto;
  margin-right: 12px;
}

.message-content-my {
  background-color: #b3dfdc;
}
</style>