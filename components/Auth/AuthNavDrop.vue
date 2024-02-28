<template>
    <div v-if="$auth.loggedIn && $auth.user" class="hover-popup">
        <img src="/icons/avatar.jpg" class="nav-avatar" @click="switchShow(true)">

        <div v-if="showPopup" class="overlay" @click="outSideOverlay"></div>
        <div v-if="showPopup" class="popup-container" @click="insideOverlay">
            <!-- <NuxtLink v-if="$auth.user.profile_id" class="popup-content" :to="`/profiles/user/${$auth.user.profile_id}`">
                Profiles
            </NuxtLink>
            <div v-else class="popup-content" @click="setShowAuth('CREATE_PROFILE')">Create Profile</div> -->
            <div class="popup-content">Settings</div>
            <div class="popup-content" @click="logout">Log Out</div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  data(){
    return {
      showPopup: false,
    }
  },
  methods: {
    ...mapActions({
      setShowAuth: 'authCus/setShowAuth',
    }),
    outSideOverlay(){
      this.switchShow(false)
    },
    insideOverlay(e: Event){
      e.stopPropagation()
      this.switchShow(false)
    },   
    switchShow(val: boolean){
      this.showPopup = val
    },
    logout(){
      this.$auth.logout()
      localStorage.clear()
      window.location.href = '/'
    },
  },
})
</script>

<style scoped>
.overlay {
    z-index: 10;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0px;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.popup-container {
    position: absolute;
    z-index: 11;
    width: 192px;
    box-shadow: 0 1px 5px #00000040;
    border-radius: 4px;
    background-color: white;
    right: 0px;
    top: 40px;
}

.nav-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
}

.hover-popup {
    position: relative;
}

.popup-content {
    height: 54px;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: .01em;
    color: #363445;
    padding: 16px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #cdd6df;
    text-decoration: none;
    cursor: pointer;
}
</style>