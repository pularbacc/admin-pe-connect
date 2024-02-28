<template>
    <div class="gcard widget-ctn widget-ctn--light">
        <h2>Owner</h2>
        <NuxtLink :to="`/profiles/user/${idProfile}`">
          <CardUser :id-profile="idProfile"/>
        </NuxtLink>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CardUser from '../Users/CardUser.vue'
export default Vue.extend({
  components: { CardUser },
  props: {
    idProfile: {
      type: Number,
      required: true,
    },
  },
  beforeMount() {
  },
  methods: {},
    
})
</script>

<style scoped>
</style>