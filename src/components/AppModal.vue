<template>
  <section
    :class="$style.AppModal"
    @close="close"
  >
    <div :class="$style.AppModal__Content">
      <slot />
      <button
        v-if="canClose"
        type="button"
        @click.prevent="close"
        aria-label="Close"
        :class="$style.AppModal__Close"
      >
        <svg :class="$style.AppModal__CloseIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10"><path d="M19.5 5.5l-14 14M19.5 19.5l-14-14"/></g></svg>
      </button>
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

  @Prop({ default: true })
  private canClose: boolean

  private close(ev: Event) {
    this.$emit('close', ev)
  }

  get inDOM() {
    return document.body.contains(this.$el)
  }

  private focus() {
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

    target.focus()
  }

  private documentKeypress(ev: KeyboardEvent) {
    if (ev.keyCode === ESCAPE_KEYCODE) {
      this.close(ev)
    }
  }

  private mounted() {
    this.focus()
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', this.documentKeypress)
  }

  private destroyed() {
    document.body.style.overflow = 'visible'
    document.removeEventListener('keydown', this.documentKeypress)
  }
}
</script>

<style lang="stylus" module>
@import '../styles/config.styl';
@import '../styles/card.styl';

@keyframes AppModal {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes AppModal__Content {
  0% {
    opacity: 0;
    transform: translateY(-3rem);
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 1;
    transform: translateY(0rem);
  }
}

.AppModal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba($colorOffWhite, 0.9);
  z-index: $zIndexCover;
  overflow-y: auto;
  opacity: 0;
  animation: AppModal 0.5s 1 forwards;

  &__Content {
    top: 7vmin;
    background: #ffff;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0.25rem 1rem, rgba(0, 0, 0, 0.1) 0 1px 1px;
    padding: 2rem 3rem;
    position: absolute;
    left: 0;
    right: 0;
    // width: fit-content
    height: fit-content;
    width: 46rem;
    margin: auto;
    margin-bottom: 7vmin;
    max-width: 90vw;
    opacity: 0;
    transform: translate(0, -3rem);
    animation: AppModal__Content 0.5s 0.25s 1 forwards;
    border-radius: 2px;
  }

  &__Close {
    position: absolute;
    right: 1rem;
    top: 1rem;
    line-height: 0;
    height: auto;
    background: transparent;
    border: 0;
    padding: 0;
    opacity: 0.5;
    transition: $transitionBase;
    transform-origin: center center;
    display: none;

    &:hover, &:focus {
      opacity: 1;
      transform: scale(1.15);
      color: $colorPrimary;
    }

    &Icon {
      width: 2rem;
      height: 2rem;
    }
  }
}
</style>
