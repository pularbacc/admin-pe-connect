<template>
    <div>
        <div class="page-detail">
            <div class="page-header">
                <div class="page-header-name">
                    Create NotiSystem
                </div>
                <button class="btn btn--dark btn-create" @click="create">Create</button>
            </div>
            <div class="notiSystem-body form-ctn">
                <div class="form-label">Title</div>
                <input v-model="notiSystem.title" type="text" class="form-inp" placeholder="Enter title">
                <div class="form-err"></div>
                
                <div class="form-label">Content</div>
                <textarea v-model="notiSystem.content" placeholder="Enter content" type="text" class="form-area"></textarea>
                <div class="form-err"></div>

                <div class="form-label">Link</div>
                <input v-model="notiSystem.link" type="text" class="form-inp" placeholder="Enter link">
                <div class="form-err"></div>

                <div class="form-label">Price</div>
                <input v-model="notiSystem.price" type="text" class="form-inp" placeholder="Enter price">
                <div class="form-err"></div>

                <div class="form-label">Cover</div>
                <button class="btn btn--light btn--full btn--large form-chose-files" @click="uploadFileCover">
                  Upload cover photo
                  <img src="/icons/chose-files.svg" class="form-chose-files-icn">
                </button>
                <input ref="inpFileCover" type="file" accept="image/*" display="none" style="display: none;" @change="uploadCover">
                <img v-if="notiSystem.cover" :src="$linkFile(notiSystem.cover)" class="cover-photo">
                <div class="form-err"></div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  components: {
  },
  data () {
    return {
      notiSystem: {
        title: '',
        content: '',
        cover: '',
        link: '',
        price: '',
      },
    }
  },
  computed: {
  },
  mounted() {
  },

  methods: {
    ...mapActions({
      setNotiMess: 'notiMess/setNotiMess',
    }),
    async create(){
      try {
        await this.$api.notiSystem.createNotiSystem(this.notiSystem).then(res => {
          this.setNotiMess({mess: 'Create NotiSystem Success'})
          this.$router.push('/noti-systems')
        })
      } catch (error) {
        this.$log.error(error)
      }  
    },
    uploadFileCover() {
      if (this.$refs.inpFileCover) {
        (this.$refs.inpFileCover).click()
      }
    },

    async uploadCover() {
      if (this.$refs.inpFileCover) {
        const inpFile = (this.$refs.inpFileCover)
        if (inpFile.files) {
          try {
            const data = new FormData()
            data.append('files', inpFile.files[0])
            await this.$api.file.uploadFiles(data).then(res => {
              this.notiSystem.cover = res[0].id
            })
          } catch (error) {
            this.$log.error(error)
          }
        }

      }
    },
  },
})
</script>

<style scoped>
.header-ctn {
    height: 53px;
    border-bottom: var(--dividerStyle);
    display: flex;
    align-items: center;
    padding: 0px 16px;
}
.notiSystem-title {
    color: #1e2227;
    font-weight: 500;
    font-size: 20px;
}

.notiSystem-body {
    padding: 16px;
}

.btn-create {
    margin-left: auto;
}

.form-chose-files {
  text-align: left;
  font-weight: 400;
  color: #8f9194;
  border: 1px solid var(--color-formFieldBorder);
}

.cover-photo {
  width: 50%;
  margin-top: 24px;
  border-radius: 4px;
}

.btn-create {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  margin-left: auto;
}
</style>