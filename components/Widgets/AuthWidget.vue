<template>
    <div class="gcard widget-ctn widget-ctn--light">
        <h2>New to PetConnect</h2>
        <div class="widget-desc">Sign up now to get your own personalized timeline!</div>

        <button class="btn btn--dark btn--full btn-auth" @click="setAuth('LOGIN')">Sign In</button>
        <button class="btn btn--light btn--full btn-auth" @click="setAuth('REGISTER')">Sign Up</button>
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