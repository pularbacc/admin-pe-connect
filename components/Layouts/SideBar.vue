<template>
    <div class="sidebar">
        <div class="sidebar-head">
          Dashboard
        </div>
        <div class="sidebar-body">
          <NuxtLink
              v-for="page of pages" :key="page.link" :to="page.link" class="tab-ctn"
              :class="{ 'active': currentPath == page.link }"    
          >
              <img :src="page.icon" class="tab-icn">
              <span class="tab-name">{{ page.name }}</span>
          </NuxtLink>
        </div>
        
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      pages: [
        {
          link: '/users',
          name: 'Users',
          icon: '/icons/tab-user.svg',
        },
        {
          link: '/profiles',
          name: 'Profiles',
          icon: '/icons/tab-profile.png',
        },
        {
          link: '/posts',
          name: 'Posts',
          icon: '/icons/tab-post.svg',
        },
        {
          link: '/pets',
          name: 'Pets',
          icon: '/icons/tab-pet.svg',
        },
        {
          link: '/articles',
          name: 'Articles',
          icon: '/icons/tab-article.svg',
        },
        {
          link: '/noti-systems',
          name: 'Notifications System',
          icon: '/icons/tab-noti.svg',
        },
        {
          link: '/reports',
          name: 'Report',
          icon: '/icons/tab-report.svg',
        },
      ],
    }
  },
  computed: {
    currentPath() {
      return this.$route.path
    },
  },
})
</script>

<style scoped>
.sidebar {
  position: absolute;
  width: 100%;
  height: 100%;
}

.sidebar-head {
  height: 48px;
  width: 100%;
  position: absolute;
  top: 0px;
  display: flex;
  align-items: center;
  padding: 0px 12px;
  border-bottom: 1px solid #a5acb5;
  font-size: 16px;
  font-weight: 500;
}

.sidebar-body {
  position: absolute;
  width: 100%;
  height: calc(100% - 48px);
  bottom: 0px;
  padding-top: 12px;
}

.tab-ctn {
  width: 100%;
  display: flex;
  padding: 12px;
}

.tab-ctn:hover {
  cursor: pointer;
  background-color: white;
}

.active {
  background-color: white;
}

.tab-icn {
  margin-right: 12px;
  width: 24px;
  height: 24px;
}

.tab-name {
  font-size: 15px;
}
</style>