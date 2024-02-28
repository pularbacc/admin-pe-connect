<template>
    <div class="layout-ctn">
        <NavbarLayout v-if="$auth.loggedIn"/>
        <div v-if="$auth.loggedIn" class="page">
          <div class="container">
            <div class="page-ctn">
              <div class="page-left">
                <SideBar/>
              </div>
              <div class="page-main">
                <Nuxt/>
              </div>
            </div>
          </div>
        </div>
        <PopupLogin v-else/>
        <div style="display: none;">
          <ConfirmPopup/>
        </div>
        <NotiMess/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import PopupLogin from '~/components/Auth/PopupLogin.vue'
import NavbarLayout from '~/components/Layouts/NavbarLayout.vue'
import SideBar from '~/components/Layouts/SideBar.vue'
import NotiMess from '~/components/Layouts/NotiMess.vue'
import ConfirmPopup from '~/components/Common/ConfirmPopup.vue'

export default Vue.extend({
  components: {
    PopupLogin,
    NavbarLayout,
    SideBar,
    NotiMess,
    ConfirmPopup,
  },
  computed: {
    ...mapGetters({
      getShowAuth: 'authCus/getShowAuth',
    }),
  },
  methods: {
    ...mapActions({
      setShowAuth: 'authCus/setShowAuth',
    }),
    closeCreateProfile(){
      this.setShowAuth(false)
    },
  },
})
</script>

<style scoped>
.layout-ctn {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
}

.page {
  position: absolute;
  left: 0px;
  top: var(--size400);
  width: 100%;
  height: calc(100% - var(--size400));
  overflow-y: auto;
  background-color: #f0faf9;
  padding: 24px 0px;
}

.page-ctn {
  background: white;
  width: 100%;
  height: calc(100vh - 110px);
  border-radius: 4px;
  position: relative;
}

.page-left {
  width: 250px;
  height: 100%;
  position: absolute;
  border-right: var(--dividerStyle);
  background: #f5f5f5;
  box-shadow: 0 1px 5px #00000026;
  z-index: 2;
}

.page-main {
  position: absolute;
  width: calc(100% - 250px);
  height: 100%;
  right: 0px;
}

</style>