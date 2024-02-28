<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters({
      getNotiMess: 'notiMess/getNotiMess',
    }),
  },
  methods: {
    ...mapActions({
      clearNotiMess: 'notiMess/clearNotiMess',
    }),
    clearNoti(event: Event | undefined): void {
      if (event) {
        event.stopPropagation()
      }
      this.clearNotiMess()
    },
    toNotifi(): void {
      if (this.getNotiMess.link) {
        this.$router.push(this.getNotiMess.link)
      }
      this.clearNoti(undefined)
    },

  },
})
</script>

<template>
    <div v-if="getNotiMess.show">
        <div
            class="noti-container" :class="{
            'noti-container-error': getNotiMess.error,
            'noti-bottom': getNotiMess.bottom
        }" @click="toNotifi">
            {{ getNotiMess.mess }}
            <img src="/icons/close-noti.svg" class="close-noti" @click="clearNoti($event)" />
        </div>
    </div>
</template>

<style scoped>
.noti-container {
    position: fixed;
    min-width: 260px;
    min-height: 56px;
    right: 24px;
    top: 50px;
    background: #f9ce50;
    border-radius: 6px;
    clear: both;
    display: block;
    z-index: 20;

    font-weight: normal;
    font-size: 16px;
    line-height: 24px;

    letter-spacing: 0.02em;
    color: #0f1419;
    display: flex;
    align-items: center;
    padding: 0px 60px 0px 16px;

    border: 1px solid #f5f5f5;
    box-sizing: border-box;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);
}

.noti-container:hover {
    cursor: pointer;
}

.noti-container-error {
    background: #eb5757;
}

.close-noti {
    position: absolute;
    right: 16px;
}

.noti-bottom {
    top: auto;
    bottom: 60px;
}

@media screen and (max-width: 600px) {
    .noti-container {
        top: 48px;
        right: 12px;
        width: calc(100% - 24px);
    }
}
</style>
