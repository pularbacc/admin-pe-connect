<template>
  <div class="gcard card-profile-ctn">
    <div v-if="typeProfile === 'user'">
      <EditProfile 
        v-if="showEditProfile && profile" 
        :type="'UPDATE_PROFILE'" 
        :profile-prop="profile" 
        @close="closeEditProfile" 
        @updateProfile="updateProfile"
      />
    </div>
    <div v-else>
      <EditProfile 
        v-if="showEditProfile && profile" 
        :type="'UPDATE_PROFILE_PET'" 
        :profile-prop="profile"
        @close="closeEditProfile" 
        @updateProfile="updateProfile"
      />
    </div>
    <div class="cover-ctn">
      <img class="cover-photo" src="https://pbs.twimg.com/profile_banners/1632424653506637827/1680610875/1500x500">
    </div>
    <div class="profile-info-ctn">
      <div class="profile-avatar-ctn">
        <div class="profile-pic-ctn">
          <img v-if="typeProfile === 'user'" class="profile-pic"  :src="profile.avatar ? $linkFile(profile.avatar) : '/icons/avatar.jpg'">
          <img v-else class="profile-pic"  :src="profile.avatar ? $linkFile(profile.avatar) : '/icons/avatar-pet.png'">
        </div>
        <div class="action-ctn">
          <div v-if="typeProfile === 'user'">
            <div v-if="isMyProfile">
              <button  class="btn btn--light" @click="openEditProfile">Edit Profile</button>
              <button class="btn btn--dark" style="margin-left: 4px;" @click="setAuth('CREATE_PROFILE_PET')">New Pet</button>
            </div>
            <div v-else>
              <button class="btn btn--dark" @click="follow">Follow</button>
              <NuxtLink class="btn btn--dark btn-center" :to="`/conversations/${profile.id}`">
                Chat
              </NuxtLink>
            </div>
          </div>
          <div v-else>
            <button v-if="isOwner" class="btn btn--light" @click="openEditProfile">Edit Profile</button>
            <button v-else class="btn btn--dark" @click="follow">Follow</button>
          </div>
        </div>
        
      </div>
      <div class="profile-name">
        {{ profile.name }}
      </div>
      <div class="profile-desc">
        {{ profile.description }}
      </div>
      <div class="profile-follow">
        <span class="follow-chip">
          <span class="follow-count">270</span>
          <span>Following</span>
        </span>
        <span class="follow-chip">
          <span class="follow-count">560</span>
          <span>Followers</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import type { PropType } from 'vue'
import EditProfile from './EditProfile.vue'
import type { IProfileRes } from '~/types/profile'
import { TypeShowAuth } from '~/store/auth/state'
import { IPetRes } from '~/types/pet'

export default Vue.extend({
  components: { EditProfile },
  props: {
    typeProfile: {
      type: String,
      required: true,
    },
    profile: {
      type: Object as PropType<IProfileRes | IPetRes>,
      required: true,
    },
  },
  data() {
    return {
      showEditProfile: false,
    }
  },
  computed:{
    isMyProfile(){
      if(this.$auth.user && this.$auth.user.profile_id === this.profile.id){
        return true
      }
      return false
    },
    isOwner(){
      if(this.$auth.user &&  this.$auth.user.profile_id === (this.profile as IPetRes).profile_id){
        return true
      }
      return false
    },
  },
  methods: {
    ...mapActions({
      setShowAuth: 'authCus/setShowAuth',
    }),
    openEditProfile() {
      this.showEditProfile = true
    },
    closeEditProfile() {
      this.showEditProfile = false
    },
    follow(){

    },
    setAuth(val: TypeShowAuth){
      this.setShowAuth(val)
    },
    updateProfile(data: {
      name: string,
      description: string,
    }){
      this.$emit('updateProfile', data)
    },
  },
})
</script>

<style scoped>
.cover-ctn {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.cover-photo {
  width: 100%;
  object-fit: cover;
}

.profile-info-ctn {
  padding: 20px;
}

.profile-avatar-ctn {
  width: 100%;
  height: 68px;
  position: relative;
}

.profile-pic-ctn {
  width: 134px;
  height: 134px;
  bottom: 20px;
  position: absolute;
  border-radius: 67px;
  overflow: hidden;
  border: 4px solid white;
}

.profile-pic {
  width: 100%;
}

.btn-edit-profile {
  position: absolute;
  right: 0px;
}

.profile-name {
  font-size: 20px;
  font-weight: 600;
  color: #0f1419;
}

.profile-desc {
  font-size: 15px;
  margin: 12px 0px;
}

.profile-follow {
  font-size: 14px;
}

.follow-chip+.follow-chip {
  margin-left: 12px;
}

.follow-count {
  font-weight: 600;
  color: #0f1419;
}

.card-profile-ctn {
  margin-bottom: 24px;
  padding: 0px;
  overflow: hidden;
}

.action-ctn {
  margin-left: auto;
  position: absolute;
  right: 0px;
}

.btn-center {
  display: inline-flex;
  align-items: center;
}
</style>