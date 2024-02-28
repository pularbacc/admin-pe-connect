<template>
	<div style="margin-bottom: 24px;">
		<div class="gcard post-hover" @click="switchCreate(true)">
			<img src="/icons/avatar.jpg" class="card-avatar">
			<input type="text" class="card-inp inp-hover" placeholder="Create Post">
		</div>
		<PopupCard v-if="showCreate" @close="switchCreate(false)">
			<template #nav>
				<div class="popup-title">Create Post</div>
			</template>
			<template #body>
				<form class="form-ctn" @submit.prevent="createPost">
					<div class="form-label">Title</div>
					<input v-model="post.title" placeholder="Enter title" class="form-inp" type="text" />
					<div class="form-err"></div>

					<div class="form-label">Content</div>
					<textarea v-model="post.content" placeholder="Enter Content" class="form-area" type="text" ></textarea>
					<div class="form-err"></div>
				
					<div class="form-label">Pets</div>
					<div 
						v-for="pet of pets" :key="pet.id" 
						class="chose-pet" 
						:class="{'chose-pet-active': petsChose.includes(pet)}"
						@click="chosePet(pet)"
						>
						<CardPet :pet-prop="pet"/>
					</div>
					<div class="form-err"></div>

					<button class="btn btn--light btn--full btn--large form-chose-files">
						More images to describe
						<img src="/icons/chose-files.svg" class="form-chose-files-icn">
					</button>
					<div class="form-err"></div>

					
				</form>
			</template>
			<template #action>
				<button class="btn btn--dark btn--full btn--large" @click="createPost">
					Create Post
					
				</button>
			</template>
		</PopupCard>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import PopupCard from '~/components/Common/PopupCard.vue'
import { IPetRes } from '~/types/pet'
import CardPet from '~/components/Pets/CardPet.vue'

export default Vue.extend({
  components: {
    PopupCard,
    CardPet,
  },
  data() {
    return {
      showCreate: false,
      post: {
        title: '',
        content: '',
      },
	  pets: [] as Array<IPetRes>,
	  petsChose: [] as Array<IPetRes>,
    }
  },
  async beforeMount(){
    
  },
  methods: {
    ...mapActions({
      setNotiMess: 'notiMess/setNotiMess',
    }),
    createPost() {
	  const idPetsChose = this.petsChose.map(item => {
        return {
          id: item.id,
        }
	  })
      this.$api.post.createPost({
        title: this.post.title,
        content: this.post.content,
        pets: idPetsChose,
	  }).then(res => {
        this.$log.log(res)
        this.setNotiMess({
          mess: 'Post Create Success',
        })
        this.$emit('addPost', res)
        this.switchCreate(false)
      })
    },
    async switchCreate(val: boolean): Promise<void> {
      this.showCreate = val
	  if(val){
        if(this.$auth.user && this.$auth.user.profile_id){
          try {
            await this.$api.pet.getPetsByUser(this.$auth.user.profile_id as number).then(res =>{
			  this.pets = res
            })
          } catch (error) {
            this.$log.error(error)
          }
        }
	  }else {
        this.post = {
          title: '',
          content: '',
        }
	  	this.pets =  []
	  	this.petsChose = []
	  }
    },
    chosePet(pet: IPetRes){
      const indexPet = this.petsChose.findIndex(item => item.id === pet.id)
      if(indexPet >= 0){
        this.petsChose.splice(indexPet, 1)
      }else {
        this.petsChose.push(pet)
      }
      
    },
  },
})
</script>

<style scoped>
.post-hover {
	display: flex;
	cursor: pointer;
}

.inp-hover {
	margin-left: 12px;
	outline: none;
}

.form-chose-files {
	display: flex;
	align-items: center;
	font-weight: 400;
	font-size: 14px;
}

.form-chose-files-icn {
	margin-left: auto;
}

.chose-pet {
	cursor: pointer;
	padding: 0px 16px;
	border-radius: 12px;
	clear: both;
	display: inline-flex;
	margin-right: 12px;
}

.chose-pet .pet-ctn {
	padding: 6px 0px;
	clear: both;
	display: inline-flex;
	border: none;
}

.chose-pet-active {
	background-color: #b3dfdc;
}
</style>