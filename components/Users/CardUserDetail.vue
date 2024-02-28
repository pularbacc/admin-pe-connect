<template>
    <div v-if="profile" class="user-ctn">
        <img class="avatar-user" src="/icons/avatar.jpg" alt="">
        <div class="user-name">{{ profile.name }}</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import type { IProfileInfoRes } from '~/types/profile'

export default Vue.extend({
  props: {
    idProfile: {
      type: Number,
      default: undefined,
    },
    profileProp: {
      type: Object as PropType<IProfileInfoRes>,
      default: undefined,
    },
  },
  data(){
    return {
      profile: undefined as IProfileInfoRes | undefined,
    }
  },
  async beforeMount(){
    if(this.profileProp){
      this.profile = this.profileProp
    }else {
      try {
        this.profile = await this.$getUser(this.idProfile)
      } catch (error) {
        this.$log.error(error)
      }
    }
  },
})
</script>

<style scoped>

.user-ctn {
    display: flex;
    align-items: center;
    padding: 12px 0px;
}

.avatar-user {
    width: 38px;
    height: 38px;
    object-fit: cover;
    border: 1px solid #d1d7d7;
    border-radius: 50%;
}

.user-name {
    color: #0f1419;
    margin-left: 12px;
}
</style>