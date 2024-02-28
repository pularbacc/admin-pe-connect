<template>
    <div class="page-container">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({

})
</script>

<style scoped>
.page-container {
    display: flex;
    height: 100vh;
    width: 100%;
}
</style>