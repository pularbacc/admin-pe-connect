<template>
    <div class="gcard widget-ctn widget-ctn--light">
        <button class="btn btn--dark btn--full btn-auth" @click="setAuth('CREATE_PROFILE_PET')">New Pet</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { TypeShowAuth } from '~/store/auth/state'

export default Vue.extend({
  methods:{
    ...mapActions({
      setShowAuth: 'authCus/setShowAuth',
    }),
    setAuth(val: TypeShowAuth){
      this.setShowAuth(val)
    },
  },
})
</script>

<style scoped>
.btn-auth {
    margin-top: 12px;
    height: 38px;
}
</style>