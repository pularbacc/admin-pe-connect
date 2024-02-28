<template>
    <div>
        <div class="overlay" @click="outSideOverlay">
            <div class="popup-container" @click="insideOverlay">
                
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
    width: 600px;
    max-height: 90vh;
    border-radius: 12px;
}
</style>