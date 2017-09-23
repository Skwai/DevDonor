<template>
  <router-link
    v-if="to"
    :to="to"
    class="Btn"
    :class="[colorClassName, sizeClassName, loadingClassName]"
  >
    <slot/>
  </router-link>
  <button
    v-else
    class="Btn"
    :disabled="disabled"
    :class="[colorClassName, sizeClassName, loadingClassName]"
    @click="onClick"
  >
    <span class="Btn__Icon" v-if="$slots.icon">
      <slot name="icon" />
    </span>
    <slot/>
  </button>
</template>

<script>
const COLORS = ['dark', 'light', 'primary', 'stroke', 'link']
const SIZES = ['large']

export default {
  props: ['to', 'color', 'size', 'click', 'disabled', 'loading'],

  methods: {
    onClick (ev) {
      if (this.loading) {
        ev.preventDefault()
        return false
      }

      if (this.click) {
        ev.preventDefault()
        this.click(ev)
      }
    }
  },

  computed: {
    colorClassName () {
      const { color } = this
      return (color && COLORS.includes(color)) ? `Btn--${color}` : null
    },
    loadingClassName () {
      return this.loading ? '-loading' : null
    },
    sizeClassName () {
      const { size } = this
      return (size && SIZES.includes(size)) ? `Btn--${size}` : null
    }
  }
}
</script>

<style lang="stylus">
@keyframes loading
  from
    transform: rotate(0deg)
  to
    transform: rotate(359deg)

@require "../styles/config.styl"
@require "../styles/text.styl"


.Btn
  background: #fff
  border-radius: 99rem
  color: colorPrimaryBlue
  padding: 0.75rem 1.5rem
  display: inline-flex
  align-items: center
  transition: transitionBase
  text-decoration: none
  background: #fff
  color: inherit
  border: 0
  textSmallCaps()
  white-space: nowrap
  cursor: pointer
  box-shadow: inset rgba(0,0,0,.1) 0 0 0 1px
  position: relative

  &:focus,
  &:active
    outline: 0

  &.-loading
    color: transparent
    opacity: .5
    cursor: not-allowed

    &::before
      size = 2rem
      content: ""
      position: absolute
      width: size
      height: size
      left: 50%
      top: 50%
      margin: (-0.5 * size) 0 0 (-0.5 * size)
      animation: loading 1s ease infinite
      background: embedurl("../assets/loading-white.svg", "utf8") center center
      background-size: contain

  &--large
    padding: spacingSmall 2rem
    textCaps()

  &--dark
    background: colorDarkBlue
    color: #fff

  &--primary
    background: colorPrimaryBlue
    color: #fff

  &:hover,
  &:focus
    box-shadow: inset rgba(0,0,0,.25) 0 0 0 1px

  &:active
    transform: translateY(-2px)

  &__Icon
    margin-right: 1em

    svg
      width: 2em
      height: 2em
      stroke: currentColor
</style>
