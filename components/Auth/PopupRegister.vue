<template>
  <div>
    <PopupCard @close="close">
      <template #nav>
        <div class="popup-title">Sign Up</div>
      </template>
      <template #body>
        <form class="form-ctn" @submit.prevent="register">
          <div class="form-label">Email</div>
          <input v-model="email" placeholder="Enter Email" class="form-inp" type="text" />
          <div class="form-err"></div>

          <div class="form-label">Password</div>
          <input v-model="password" placeholder="Enter Password" class="form-inp" type="password" />
          <div class="form-err"></div>

          <div class="form-label">Confirm Password</div>
          <input v-model="confirm_password" placeholder="Enter Confirm Password" class="form-inp" type="password" />
          <div class="form-err"></div>
        </form>
      </template>
      <template #action>
        <button type="submit" class="btn btn--dark btn--full btn--large" @click="register">Sign Up</button>
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
      confirm_password: '',
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
    async register() {
      try {
        await this.$api.auth.register({
          email: this.email,
          password: this.password,
          confirm_password: this.confirm_password,
        }).then(res => {
          this.$log.log(res)
          this.setNotiMess({
            mess: 'Register Success',
          })
          this.close()
        })
      } catch (error) {
        this.$log.log('register 3')
        this.$log.error('error register ', error)
      }
    },
  },
})
</script>

<style scoped></style>