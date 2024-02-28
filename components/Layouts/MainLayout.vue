<template>
    <div class="feed">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted(){
  },
})
</script>

<style scoped>
.feed {
    border-right: 1px solid var(--twitter-background);
    border-left: 1px solid var(--twitter-background);
    width: 100%;
}

.feed__header h2 {
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 0px;
}

.feed__header {
    background-color: white;
    border: 1px solid var(--twitter-background);
    padding: 20px;
}


.feed::-webkit-scrollbar {
    display: none;
}

.feed {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>