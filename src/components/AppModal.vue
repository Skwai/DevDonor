<template>
  <section
    :class="$style.AppModal"
    @close="close"
  >
    <div :class="$style.AppModal__Content">
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

const ESCAPE_KEYCODE = 27

@Component
export default class AppModal extends Vue {
  @Prop({ default: true })
  private open: boolean

  private close(ev: Event) {
    this.$emit('close', ev)
  }

  get inDOM() {
    return document.body.contains(this.$el)
  }

  private focus() {
    let target = this.$el.querySelector(
      '[autofocus]:not([disabled])'
    ) as HTMLElement

    if (!target && this.$el.tabIndex >= 0) {
      target = this.$el
    }

    if (!target) {
      const opts = ['button', 'input', 'keygen', 'select', 'textarea']
      const query = opts.map(el => `${el}:not([disabled])`)
      query.push('[tabindex]:not([disabled]):not([tabindex=""])')
      target = this.$el.querySelector(query.join(', ')) as HTMLElement
    }

    target && target.focus()
  }

  private documentKeypress(ev: KeyboardEvent) {
    if (ev.keyCode === ESCAPE_KEYCODE) {
      this.close(ev)
    }
  }

  private mounted() {
    this.focus()
    document.addEventListener('keydown', this.documentKeypress)
  }

  private destroyed() {
    document.removeEventListener('keydown', this.documentKeypress)
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"
@import "../styles/card.styl"

@keyframes AppModal
  0%
    transform: translate(0, -3rem)
    opacity: 0
  50%
    opacity: 1
  100%
    opacity: 1
    transform: translate(0, 0)

.AppModal
  position: fixed
  left: 0
  top: 0
  right: 0
  bottom: 0
  background: rgba($colorLightGray, 0.5)
  z-index: $zIndexCover
  overflow-y: auto

  &__Content
    top: 7vmin
    background: #ffff
    box-shadow: rgba(0,0,0,.1) 0 0 0 1px, rgba(0,0,0,.075) 0 0.25rem 1rem
    padding: 2rem
    position: absolute
    left: 0
    right: 0
    // width: fit-content
    height: fit-content
    width: 42rem
    margin: auto
    margin-bottom: 7vmin
    max-width: 90vw
</style>
