<template>
  <div class="Upload" slot="object">
    <AppMediaObject align="center">
      <template slot="object">
        <div v-if="url" class="Upload__Preview">
          <img :src="url" class="Upload__PreviewImage">
          <button type="button" @click.prevent="removeUpload" class="Upload__Remove"><svg class="Upload__RemoveIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>
        </div>
        <label class="Upload__Drop" v-else>
          <AppLoading v-if="uploading" />
          <div v-else>
            <svg class="Upload__Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke-width="1" stroke-miterlimit="10"><path d="M12 22V9" data-cap="butt"/><path d="M9 12l3-3 3 3" stroke-linecap="square"/><path d="M16 17h3c2.209 0 4-1.791 4-4 0-2.197-1.782-4.013-4.025-3.997C18.718 5.093 15.474 2 11.5 2 7.481 2 4.21 5.164 4.018 9.136 2.287 9.575 1 11.132 1 13c0 2.209 1.791 4 4 4h3" stroke-linecap="square"/></g></svg>
            <input type="file" @change="upload" class="Upload__File">
          </div>
        </label>
      </template>
      <div slot="body">
        <p v-if="label" class="Upload__Label">{{label}}</p>
        <AppHelpText v-if="description">{{description}}</AppHelpText>
      </div>
    </AppMediaObject>
  </div>
</template>

<script>
import { storage } from '@/services/firebase'

export default {
  props: [
    'url',
    'fileTypes',
    'maxFileSize',
    'filePath',
    'fileName',
    'label',
    'description'
  ],

  data () {
    return {
      progress: 0,
      uploading: false
    }
  },

  methods: {
    removeUpload () {
      if (!this.url) return
      this.$emit('update:url', null)
    },

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

        const { downloadURL } = await task
        this.$emit('update:url', downloadURL)
      } finally {
        this.uploading = false
      }
      // TODO: resize image: https://gist.github.com/dcollien/312bce1270a5f511bf4a
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"

.Upload
  size = 7rem
  margin-bottom: spacingBase

  &__Preview
    width: size
    height: size
    display: flex
    align-items: center
    justify-content: center
    position: relative
    border: #fff solid 4px
    box-shadow: colorGray 0 0 0 1px

    &Image
      width: 100%
      height: 100%
      object-fit: cover

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
    width: size
    height: size
    border-radius: borderRadiusBase
    border: colorGray dashed 2px
    display: flex
    align-items: center
    justify-content: center
    text-align: center
    transition: transitionBase

    &:hover
      border-color: colorPrimaryBlue
      color: colorPrimaryBlue

  &__Icon
    width: 2.5rem
    height: 2.5rem
    stroke: currentColor

  &__Label
    font-weight: 500

  &__Remove
    top: -4px
    right: -4px
    position: absolute
    display: flex
    justify-content: center
    align-items: center
    padding: 0
    border: 0
    width: 2rem
    height: 2rem
    background #fff
    transition: transitionBase

    &Icon
      height: 1.25rem
      width: 1.25rem

    &:hover,
    &:focus
      opacity: 1

    &:hover &Icon,
    &:focus &Icon
      opacity: 1

    &:focus
      outline: 0

    &Icon
      opacity: .5
      transition: transitionBase


</style>
