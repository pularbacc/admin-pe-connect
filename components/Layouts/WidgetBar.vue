<template>
    <div class="widgets">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({

})
</script>

<style scoped>
.widgets {
    width: 350px;
    min-width: 350px;
}
</style>