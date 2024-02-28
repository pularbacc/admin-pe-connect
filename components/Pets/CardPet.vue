<template>
    <div v-if="pet" class="pet-ctn">
        <img class="avatar-pet" src="/icons/avatar-pet.png" alt="">
        <div class="pet-name">{{ pet.name }}</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import type { IPetRes } from '~/types/pet'

export default Vue.extend({
  props: {
    idPet: {
      type: Number,
      default: undefined,
    },
    petProp: {
      type: Object as PropType<IPetRes>,
      default: undefined,
    },
  },
  data(){
    return {
      pet: undefined as IPetRes | undefined,
    }
  },
  async beforeMount(){
    if(this.petProp){
      this.pet = this.petProp
    }else {
      try {
        await this.$api.pet.detailProfilePet(this.idPet).then(res => {
          this.pet = res
        })
      } catch (error) {
        this.$log.error(error)
      }
    }
  },
})
</script>

<style scoped>

.pet-ctn {
    display: flex;
    align-items: center;
    padding: 12px 0px;
    border-top: var(--dividerStyle);
}

.avatar-pet {
    width: 38px;
    height: 38px;
    object-fit: cover;
    border: 1px solid #d1d7d7;
    border-radius: 50%;
    padding: 4px;
}

.pet-name {
    color: #0f1419;
    margin-left: 12px;
}
</style>