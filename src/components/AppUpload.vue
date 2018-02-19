<template>
  <div :class="$style.AppUpload">
    <AppMediaObject align="center">
      <template slot="object">
        <div v-if="url" :class="$style.AppUpload__Preview">
          <img :src="url" :class="$style.AppUpload__PreviewImage">
          <button type="button" @click.prevent="removeUpload" :class="$style.AppUpload__Remove"><svg :class="$style.AppUpload__RemoveIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>
        </div>
        <label :class="$style.AppUpload__Drop" v-else>
          <AppLoading v-if="uploading" />
          <div v-else>
            <svg :class="$style.AppUpload__Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke-width="1" stroke-miterlimit="10"><path d="M12 22V9" data-cap="butt"/><path d="M9 12l3-3 3 3" stroke-linecap="square"/><path d="M16 17h3c2.209 0 4-1.791 4-4 0-2.197-1.782-4.013-4.025-3.997C18.718 5.093 15.474 2 11.5 2 7.481 2 4.21 5.164 4.018 9.136 2.287 9.575 1 11.132 1 13c0 2.209 1.791 4 4 4h3" stroke-linecap="square"/></g></svg>
            <input type="file" @change="upload" :class="$style.AppUpload__File">
          </div>
        </label>
      </template>
      <div slot="body">
        <p v-if="label" :class="$style.AppUpload__Label">{{label}}</p>
        <AppHelpText v-if="description">{{description}}</AppHelpText>
      </div>
    </AppMediaObject>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { storage } from '../services/db'

@Component
export default class AppUpload extends Vue {
  @Prop() private url: string

  @Prop() private fileTypes: string[]

  @Prop() private maxFileSize: number

  @Prop() private filePath: string

  @Prop() private fileName: string

  @Prop() private label: string

  @Prop() private description: string

  private progress: number = 0
  private uploading: boolean = false

  private removeUpload() {
    if (!this.url) {
      return
    }
    this.$emit('update:url', null)
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
      const ext = file.name.split('.').pop()
      const path = `${this.filePath}/${this.fileName}.${ext}`
      const ref = storage.ref().child(path)
      const metadata = { contentType: file.type }
      const task = ref.put(file, metadata)

      task.on(
        'state_changed',
        (ev: any) => {
          this.progress = ev.bytesTransferred / ev.totalBytes * 100
        },
        (err: Error) => {
          throw err
        }
      )

      const { downloadURL } = await task
      this.$emit('update:url', downloadURL)
    } finally {
      this.uploading = false
    }
    // TODO: resize image: https://gist.github.com/dcollien/312bce1270a5f511bf4a
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

    &Image {
      width: 100%;
      height: 100%;
      object-fit: cover;
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

    &:hover {
      border-color: $colorPrimary;
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
    top: -4px;
    right: -4px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    border: 0;
    width: 2rem;
    height: 2rem;
    background: #fff;
    transition: $transitionBase;

    &Icon {
      height: 1.25rem;
      width: 1.25rem;
    }

    &:hover, &:focus {
      opacity: 1;
    }

    &:hover &Icon, &:focus &Icon {
      opacity: 1;
    }

    &:focus {
      outline: 0;
    }

    &Icon {
      opacity: 0.5;
      transition: $transitionBase;
    }
  }
}
</style>
