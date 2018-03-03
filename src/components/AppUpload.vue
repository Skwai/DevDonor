<template>
  <div :class="$style.AppUpload" :focused="focused">
    <AppMediaObject align="center">
      <template slot="object">
        <div v-if="value" :class="$style.AppUpload__Preview">
          <img
            v-if="previewImageLoaded"
            :src="value"
            :class="$style.AppUpload__PreviewImage"
          >
          <AppLoading v-else></AppLoading>
        </div>
        <label :class="$style.AppUpload__Drop" v-else>
          <AppLoading v-if="uploading" />
          <div v-else>
            <svg :class="$style.AppUpload__Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke-width="1" stroke-miterlimit="10"><path d="M12 22V9" data-cap="butt"/><path d="M9 12l3-3 3 3" stroke-linecap="square"/><path d="M16 17h3c2.209 0 4-1.791 4-4 0-2.197-1.782-4.013-4.025-3.997C18.718 5.093 15.474 2 11.5 2 7.481 2 4.21 5.164 4.018 9.136 2.287 9.575 1 11.132 1 13c0 2.209 1.791 4 4 4h3" stroke-linecap="square"/></g></svg>
            <input @focus="onFocus" @blur="onBlur" type="file" @change="upload" :class="$style.AppUpload__File">
          </div>
        </label>
      </template>
      <div slot="body">
        <p v-if="label" :class="$style.AppUpload__Label">{{label}}</p>
        <button
          v-if="value"
          type="button"
          @click.prevent="removeUpload"
          :class="$style.AppUpload__Remove"
        >Remove file</button>
        <AppHelpText v-else-if="description">{{description}}</AppHelpText>
      </div>
    </AppMediaObject>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { storage } from '../services/db'

const THUMBNAIL_PREFIX = 'thumbnail-'

@Component
export default class AppUpload extends Vue {
  @Prop() private url: string
  @Prop() private fileTypes: string[]
  @Prop() private maxFileSize: number
  @Prop() private filePath: string
  @Prop() private fileName: string
  @Prop() private label: string
  @Prop() private description: string
  @Prop({ required: true })
  private value: string

  private previewImageLoaded: boolean = false
  private previewImageError: boolean = false
  private focused: boolean = false
  private progress: number = 0
  private uploading: boolean = false

  @Watch('value', { immediate: true })
  private async loadPreviewImage(newValue: string, oldValue: string) {
    if (!newValue || newValue === oldValue) {
      return
    }

    this.previewImageLoaded = false
    this.previewImageError = false

    const image = new Image()
    image.src = newValue

    try {
      await new Promise((resolve, reject) => {
        image.onload = resolve
        image.onerror = reject
      })
      this.previewImageLoaded = true
    } catch {
      this.previewImageError = true
    }
  }

  private onFocus() {
    this.focused = true
  }

  private onBlur() {
    this.focused = false
  }

  private removeUpload() {
    this.$emit('input', '')
  }

  private async upload(ev: Event) {
    const el = ev.target as HTMLInputElement

    if (!el.files || !el.files.length) {
      return
    }

    const file: File = el.files[0]

    if (this.maxFileSize && file.size / Math.pow(1024, 2) > this.maxFileSize) {
      throw Error(`File is larger than ${this.maxFileSize}MB`)
    }

    this.uploading = true

    try {
      // const ext = file.name.split('.').pop()
      const path = `${this.filePath}/${this.fileName}`
      const thumbnailPath = `${this.filePath}/${THUMBNAIL_PREFIX}${this.fileName}`
      const ref = storage.ref().child(path)
      const metadata = { contentType: file.type }
      const task = ref.put(file, metadata)

      task.on(
        'state_changed',
        (snapshot: any) => {
          this.progress = snapshot.bytesTransferred / snapshot.totalBytes * 100
        },
        (err: Error) => {
          throw err
        }
      )

      const upload = await task
      const downloadUrl = upload.downloadURL

      if (!downloadUrl) {
        throw Error('Upload failed')
      }

      const thumbnailUrl = await this.getThumbnailUrl(thumbnailPath)

      this.$emit('input', thumbnailUrl)
    } finally {
      this.uploading = false
    }
  }

  private async getThumbnailUrl(path: string): Promise<string> {
    const ref = storage.ref(path)
    const timeout = new Date().getTime() + 60 * 1000

    while (new Date().getTime() < timeout) {
      try {
        // check if thumbnail exists
        const url = await ref.getDownloadURL()
        if (url) {
          return url
        }
      } catch (err) {}
      // thumbnail wasn't found, try again in 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2 * 1000))
    }

    throw Error('Timed out')
  }
}
</script>

<style lang="stylus" module>
@require '../styles/config.styl';
@require '../styles/text.styl';
@require '../styles/forms.styl';

.AppUpload {
  size = 7rem;
  grid-column: span 2;

  &__Preview {
    width: size;
    height: size;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    border: $colorGray dashed 2px;

    &Image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__File {
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  &__Drop {
    position: relative;
    width: size;
    height: size;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: $transitionBase;
    border: $colorGray dashed 2px;

    &:hover, &:focus, [focused] & {
      border-color: currentColor;
      color: $colorPrimary;
    }

    &:drop {
      border-color: currentColor;
      color: $colorPrimary;
    }
  }

  &__Icon {
    width: 2.5rem;
    height: 2.5rem;
    stroke: currentColor;
  }

  &__Label {
    fieldLabel();
  }

  &__Remove {
    display: flex;
    align-items: center;
    padding: 0;
    border: 0;
    background: #fff;
    transition: $transitionBase;
    line-height: 1;
    font-size: $fontSizeSmall;
    color: $colorPrimary;

    &:hover, &:focus {
      box-shadow: currentColor 0 1px 0;
    }
  }
}
</style>
