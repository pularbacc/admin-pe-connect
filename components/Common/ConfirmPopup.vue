<template>
    <div class="overlay" @click="outSideOverlay">
        <div class="popup-container" @click="insideOverlay">
            <div class="popup-nav">
                <slot name="nav">
                    <div class="popup-title">Confirm</div>
                </slot>
                <span class="material-symbols-outlined btn-close" @click="close">
                    close
                </span>
            </div>
            <div class="popup-body">
                <slot name="body">
                    <div class="body-content">Are you sure want to delete this</div>
                </slot>
            </div>
            <div class="popup-action">
                <slot name="action">
                    <button class="btn btn--dark btn--full btn--large">
                        Confirm
                    </button>
                </slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    close(){
      this.$emit('close')
    },
    outSideOverlay(){
      this.close()
    },
    insideOverlay(e: Event){
      e.stopPropagation()
    },   
  },
})
</script>

<style scoped>
.overlay {
    background-color: rgba(0, 0, 0, 0.4);
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
    background-color: white;
    width: 400px;
    max-height: 90vh;
    border-radius: 12px;
}

.popup-nav {
    height: 53px;
    border-bottom: var(--dividerStyle);
    display: flex;
    align-items: center;
    padding: 0px 16px;
}

.btn-close {
    cursor: pointer;
    margin-left: auto;
}

.popup-nav .popup-title {
    color: #1e2227;
    font-weight: 500;
    font-size: 20px;
}

.popup-nav .popup-action {
    margin-left: auto;
}

.popup-body {
    max-height: 600px;
    overflow: scroll;
    padding: 24px;
}

.popup-action {
    padding: 16px;
    border-top: var(--dividerStyle);
}

.form-ctn {
    padding-bottom: 0px;
}

.user-list .popup-body{
  padding: 0px 24px;
}

.body-content {
    font-size: 18px;
}
</style>