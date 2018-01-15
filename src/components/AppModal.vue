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
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

const ESCAPE_KEYCODE = 27

@Component
export default class AppModal extends Vue {
  @Prop({ default: true })
  open: boolean

  close (ev: Event) {
    this.$emit('close', ev)
  }

  get inDOM () {
    return document.body.contains(this.$el)
  }

  focus () {
    let target = this.$el.querySelector('[autofocus]:not([disabled])') as HTMLElement

    if (!target && this.$el.tabIndex >= 0) {
      target = this.$el
    }

    if (!target) {
      const opts = ['button', 'input', 'keygen', 'select', 'textarea']
      const query = opts.map((el) => `${el}:not([disabled])`)
      query.push('[tabindex]:not([disabled]):not([tabindex=""])')
      target = this.$el.querySelector(query.join(', ')) as HTMLElement
    }

    target && target.focus()
  }

  documentKeypress (ev: KeyboardEvent) {
    if (ev.keyCode === ESCAPE_KEYCODE) {
      this.close(ev)
    }
  }

  mounted () {
    this.focus()
    document.addEventListener('keydown', this.documentKeypress)
  }

  destroyed () {
    document.removeEventListener('keydown', this.documentKeypress)
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"
@import "../styles/card.styl"
@import "../styles/dialog.styl"

@keyframes AppModal
  0%
    transform: translate(0, calc(-50% - 3rem))
    opacity: 0
  50%
    opacity: 1
  100%
    opacity: 1
    transform: translate(0, -50%)

.AppModal
  dialog()
  card()
  border: 0
  box-shadow: rgba(0,0,0,.1) 0 0 0 1px, rgba(0,0,0,.075) 0 0.25rem 1rem, rgba($colorLightGray, 0.5) 0 0 0 9999rem
  width: 30rem
  animation: AppModal ease-in-out 0.5s 1 forwards
  max-width: 90vw
  z-index: 1000

  &__Title
    margin-bottom: $spacingBase
</style>
