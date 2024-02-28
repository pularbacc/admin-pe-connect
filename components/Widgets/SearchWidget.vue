<template>
    <div class="gcard card-search">
        <span class="material-symbols-outlined widgets__searchIcon"> search </span>
        <input class="card-inp inp-search" type="text" placeholder="Search Posts" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({

})
</script>

<style scoped>

.card-search {
	display: flex;
	align-items: center;
}

.inp-search {
	height: 32px;
	margin-left: 6px;
}
</style>