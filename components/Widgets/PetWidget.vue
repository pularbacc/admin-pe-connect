<template>
    <div class="gcard widget-ctn widget-ctn--light">
        <h2>Pets</h2>
        <div>
            <NuxtLink v-for="pet of pets" :key="pet.id" :to="`/profiles/pet/${pet.id}`">
                <CardPet :id-pet="pet.id"/>
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import CardPet from '~/components/Pets/CardPet.vue'

export default Vue.extend({
  components: { CardPet },
  props: {
    pets: {
      type: Array as PropType<Array<{
                id: Number;
            }>>,
      required: true,
    },
  },
  beforeMount() {
    this.$log.log(this.pets)
  },
  methods: {},
    
})
</script>

<style scoped>
</style>