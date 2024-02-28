<template>
  <div>
    <PopupCard @close="close">
      <template #nav>
        <div class="popup-title">Sign In</div>
      </template>
      <template #body>
        <form class="form-ctn" @submit.prevent="userLogin">
          <div class="form-label">Email</div>
          <input v-model="email" placeholder="Enter Email" class="form-inp" type="text" />
          <div class="form-err"></div>

          <div class="form-label">Password</div>
          <input v-model="password" placeholder="Enter Password" class="form-inp" type="password" />
          <div class="form-err"></div>
        </form>
      </template>
      <template #action>
          <button class="btn btn--dark btn--full btn--large" @click="userLogin">
              Sign In
          </button>
      </template>
    </PopupCard>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { TypeShowAuth } from '~/store/auth/state'
import PopupCard from '~/components/Common/PopupCard.vue'

export default Vue.extend({
  components: {
    PopupCard,
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    ...mapActions({
      setShowAuth: 'authCus/setShowAuth',
      setNotiMess: 'notiMess/setNotiMess',
    }),
    setAuth(val: TypeShowAuth) {
      this.setShowAuth(val)
    },
    close() {
      this.setAuth(false)
    },
    async userLogin() {
      try {
        await this.$api.auth.login(this.$auth, {
          email: this.email,
          password: this.password,
        }).then(res => {
          this.$log.log(res)
          window.location.href = '/'
          this.setNotiMess({
            mess: 'Login Success',
          })
        })
      } catch (error) {
        this.$log.error('login error ', error)
      }
    },
  },
})
</script>

<style scoped></style>
