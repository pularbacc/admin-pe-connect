<template>
  <div class="nav-container">
    <div class="container nav-content">
      <NuxtLink to="/">
        <img src="/icons/logo.png" class="logo">
      </NuxtLink>
      <!-- <img src="/icons/logo/white.png" class="logo-2"> -->
      <!-- <span class="logo-name">Pet Connect</span> -->
      
      <div class="search-ctn">
        <input type="text" class="search-inp" placeholder="Search">
        <img src="/icons/search-nav.svg" class="search-icn">
      </div>
      <!-- <NuxtLink
        v-for="page of pages" :key="page.link" :to="page.link"
        class="nav-link"
        :class="{ 'active': currentPath == page.link }">
          <img :src="page.icn">
      </NuxtLink> -->
      <div v-if="$auth.loggedIn" class="auth-ctn">
        <!-- <NuxtLink class="center" to="/conversations">
          <img class="icn-chat" src="/icons/chat-nav.svg" />
        </NuxtLink>
        <img class="icn-noti" src="/icons/noti-nav.svg" /> -->
        <AuthNavDrop />
      </div>
      <div v-else class="auth-ctn">
        <button class="btn btn--dark nav-btn" @click="setAuth('LOGIN')">Sign In</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import AuthNavDrop from '~/components/Auth/AuthNavDrop.vue'
import { TypeShowAuth } from '~/store/auth/state'

export default Vue.extend({
  components:{
    AuthNavDrop,
  },
  data() {
    return {
      pages: [
        {
          link: '/explore',
          name: 'Explore',
          icn: '/icons/paper-nav.svg',
        },
        {
          link: '/articles',
          name: 'Articles',
          icn: '/icons/new-nav.svg',
        },
      ],
    }
  },
  computed: {
    currentPath() {
      return this.$route.path
    },
  },
  mounted() {
  },
  methods:{
    ...mapActions({
      setShowAuth: 'authCus/setShowAuth',
    }),
    setAuth(val: TypeShowAuth){
      this.setShowAuth(val)
    },
  },
})
</script>

<style scoped>
.nav-container {
  height: var(--size400);
  width: 100%;
  border-bottom: 1px solid var(--twitter-background);
  position: fixed;
  top: 0px;
  z-index: 10;
  background-color: #008078;
  border-bottom: solid 1px var(--color-dividerTertiary);
  box-shadow: var(--raisedCanvas);
}

.nav-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.logo {
  width: 90px;
}

.logo-name {
  margin-right: 6rem;
  margin-left: 12px;
  font-size: 18px;
  font-weight: 500;
}

.nav-link {
  font-weight: 500;
  font-size: 16px;
  color: white;
}

.icn-chat {
  margin-left: auto;
  margin-right: 24px;
  width: 22px;
}

.icn-noti {
  margin-right: 24px;
}

.search-ctn {
  margin-left: 32px;
  width: 400px;
  background: #f0faf9;
  display: flex;
  height: 32px;
  padding: 0px 12px;
  border-radius: 8px;
  margin-right: 24px;
}

.search-inp {
  width: 100%;
  background: none;
  border: none;
  outline: none;
  font-size: 14px;
}

.search-icn {
  width: 22px;
}

.auth-ctn {
  display: flex;
  margin-left: auto;
}

.nav-btn {
  
}
</style>