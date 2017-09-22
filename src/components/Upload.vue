<template>
  <div class="Upload">
    <div v-if="url" class="Upload__Preview">
      <img :src="url" class="Upload__PreviewImage">
      <button class="Upload__Remove">x</button>
    </div>
    <label class="Upload__Drop" v-else>
      <Loading v-if="uploading" />
      <div v-else>
        <svg class="Upload__Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke-width="1" stroke-miterlimit="10"><path d="M12 22V9" data-cap="butt"/><path d="M9 12l3-3 3 3" stroke-linecap="square"/><path d="M16 17h3c2.209 0 4-1.791 4-4 0-2.197-1.782-4.013-4.025-3.997C18.718 5.093 15.474 2 11.5 2 7.481 2 4.21 5.164 4.018 9.136 2.287 9.575 1 11.132 1 13c0 2.209 1.791 4 4 4h3" stroke-linecap="square"/></g></svg>
        <div class="Upload__Label">{{label}}</div>
        <input type="file" @change="upload" class="Upload__File">
      </div>
    </label>
  </div>
</template>

<script>
import { storage } from '@/services/firebase'

export default {
  props: ['fileTypes', 'maxFileSize', 'filePath', 'fileName', 'label'],

  methods: {
    async upload (ev) {
      const [file] = ev.target.files
      if (!file) return
      const { maxFileSize } = this

      if (maxFileSize && file.size / Math.pow(1024, 2) > maxFileSize) {
        throw Error(`File is larger than ${maxFileSize}MB`)
      }

      this.uploading = true

      try {
        const { filePath, fileName } = this
        const ext = file.name.split('.').pop()
        const path = `${filePath}/${fileName}.${ext}`
        const ref = storage.ref().child(path)
        const metadata = {
          contentType: file.type
        }
        const task = ref.put(file, metadata)

        task.on('state_changed', (ev) => {
          this.progress = (ev.bytesTransferred / ev.totalBytes) * 100
        }, (err) => {
          throw err
        })

        const snapshot = await task
        this.url = snapshot.downloadURL
      } finally {
        this.uploading = false
      }

      // TODO: resize image: https://gist.github.com/dcollien/312bce1270a5f511bf4a
    }
  },

  remove () {
    if (!this.url) return

    // TODO: remove uploaded image
    this.url = null
  },

  data () {
    return {
      progress: 0,
      url: null,
      uploading: false
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"

.Upload
  margin-bottom: spacingBase

  &__Preview
    size = 6rem
    width: 6rem
    height: 6rem
    display: flex
    align-items: center
    justify-content: center
    position: relative

    &Image
      width: 6rem
      height: 6rem
      object-fit: cover

  &__Remove
    top: 0
    right: 0
    position: absolute
    background: #fff
    border: 0

  &__File
    position: absolute
    opacity: 0
    top: 0
    left: 0
    width: 100%
    height: 100%
    cursor: pointer

  &__Drop
    position: relative
    width: 100%
    height: 6rem
    border-radius: borderRadiusBase
    // border: colorLightGray dashed 2px
    background: #f4f5f7
    display: flex
    align-items: center
    justify-content: center
    // color: colorPrimaryBlue
    text-align: center

    &:hover
      border-color: darken(colorLightGray, 10)

  &__Icon
    width: 2.5rem
    height: 2.5rem
    stroke: currentColor

  &__Label
    textSmallCaps()
    font-weight: 600

</style>
