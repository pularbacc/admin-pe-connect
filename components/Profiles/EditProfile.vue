<template>
  <div>
    <PopupCard @close="close">
      <template #nav>
        <div class="popup-title">{{ titleCreate }}</div>
      </template>
      <template #body>
        <form class="form-ctn" @submit.prevent="updateProfile">
          <div class="form-label">Name</div>
          <input v-model="profile.name" placeholder="Enter Name" class="form-inp" type="text" />
          <div class="form-err"></div>

          <div class="form-label">Description</div>
          <textarea v-model="profile.description" placeholder="Enter Description" class="form-inp form-area"></textarea>
          <div class="form-err"></div>

          <div class="form-label">Birthday</div>
          <input
            :value="$date.get(profile.birthday)" 
            placeholder="Enter Birthday" 
            class="form-inp" 
            type="date"
            @input="setBirthDay" />
          <div class="form-err"></div>

          <div v-if="type === 'CREATE_PROFILE' || type === 'UPDATE_PROFILE'">
            <div class="form-label">Phone</div>
            <input v-model="profile.phone" placeholder="Enter Phone" class="form-inp" type="text" />
            <div class="form-err"></div>

            <div class="form-label">Address</div>
            <input v-model="profile.address" placeholder="Enter Address" class="form-inp" type="text" />
            <div class="form-err"></div>
          </div>
        </form>
      </template>
      <template #action>
        <button class="btn btn--dark btn--full btn--large" @click="updateProfile">Save</button>
      </template>
    </PopupCard>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { mapActions } from 'vuex'
import PopupCard from '~/components/Common/PopupCard.vue'
import { IProfileRes } from '~/types/profile'
import { TypeShowAuth } from '~/store/auth/state'
import { IPetRes } from '~/types/pet'

export default defineComponent({
  components: {
    PopupCard,
  },
  props: {
    type: {
      type: String as PropType<TypeShowAuth>,
      required: true,
    },
    profileProp: {
      type: Object as PropType<IProfileRes | IPetRes>,
      default: undefined,
    },
  },
  data() {
    return {
      profile: {
        id: 0,
        name: '',
        description: '',
        phone: '',
        address: '',
        birthday: new Date(),
        gender: true,
      },
    }
  },
  computed:{
    titleCreate(){
      switch (this.type) {
      case 'CREATE_PROFILE':
        return 'Create Profile'
      case 'CREATE_PROFILE_PET':
        return 'Create Pet'
      case 'UPDATE_PROFILE':
      case 'UPDATE_PROFILE_PET':
        return 'Update Profile'
      }
      return ''
    },
  },
  beforeMount() {
    if (this.type === 'UPDATE_PROFILE' || this.type === 'UPDATE_PROFILE_PET') {
      this.profile = {
        id: this.profileProp.id,
        name: this.profileProp.name,
        description: this.profileProp.description,
        phone: (this.profileProp as IProfileRes).phone,
        address: (this.profileProp as IProfileRes).address,
        birthday: this.profileProp.birthday,
        gender: this.profileProp.gender,
      }
    }
  },
  methods: {
    ...mapActions({
      setNotiMess: 'notiMess/setNotiMess',
    }),
    close() {
      this.$emit('close')
    },
    async updateProfile() {
      if(this.type === 'CREATE_PROFILE' || this.type === 'UPDATE_PROFILE'){
        // @ts-ignore
        delete this.profile.id

        await this.$api.profile.updateProfile(this.profile).then(res => {
          if(this.$auth.user){
            this.$auth.user.profile_id = res.id
          }

          if(this.type === 'CREATE_PROFILE'){
            this.setNotiMess({
              mess: 'Profile Create Success',
            })
          }else {
            this.$emit('updateProfile', {
              name: res.name,
              description: res.description,
            })
            this.setNotiMess({
              mess: 'Profile Update Success',
            })
          }
          this.close()
        }).catch(e => {
          this.$log.error(e)
        })
      }else if(this.type === 'CREATE_PROFILE_PET'){
        await this.$api.pet.createProfilePet({
          name: this.profile.name,
          description: this.profile.description,
          birthday: this.profile.birthday,
          gender: this.profile.gender,
        }).then((res) => {
          this.setNotiMess({mess: 'Pet Create Success'})
          this.$router.push(`/profiles/pet/${res.id}`)
          this.close()
        }).catch(e => {
          this.$log.error(e)
        })
      }else {
        await this.$api.pet.updateProfilePet(this.profile.id,{
          name: this.profile.name,
          description: this.profile.description,
          birthday: this.profile.birthday,
          gender: this.profile.gender,
        }).then((res) => {
          this.setNotiMess({mess: 'Profile Update Success'})
          this.$emit('updateProfile', {
            name: res.name,
            description: res.description,
          })
          this.close()
        }).catch(e => {
          this.$log.error(e)
        })
      }
      
    },
    setBirthDay(event: Event): void {
      const inputElement = event.target as HTMLInputElement
      if (inputElement) {
        this.profile.birthday = this.$date.convert(inputElement.value)
      }
    },
  },
})
</script>

<style scoped></style>