<template>
  <router-link v-if="to" :to="to" class="Btn" :class="[colorClassName, sizeClassName]">
    <slot/>
  </router-link>
  <button v-else class="Btn" :class="colorClassName">
    <slot/>
  </button>
</template>

<script>
const COLORS = ['dark', 'light', 'primary', 'stroke', 'link']
const SIZES = ['large']

export default {
  props: ['to', 'color', 'size'],
  computed: {
    colorClassName () {
      const { color } = this
      return (color && COLORS.includes(color)) ? `Btn--${color}` : null
    },
    sizeClassName () {
      const { size } = this
      return (size && SIZES.includes(size)) ? `Btn--${size}` : null
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"

.Btn
  background: #fff
  border-radius: 99rem
  color: colorPrimaryBlue
  padding: 0.75rem 1.5rem
  display: inline-block
  transition: transitionBase
  text-decoration: none
  border: 0
  textSmallCaps()
  white-space: nowrap
  cursor: pointer

  &:focus,
  &:active
    outline: 0

  &--large
    padding: 1rem 2rem
    textCaps()

  &--dark
    background: colorDarkBlue
    color: #fff

  &--primary
    background: colorPrimaryBlue
    color: #fff

  &:hover,
  &:focus
    box-shadow: rgba(0,0,0,.1) 0 2px 1rem

  &--light
    background: #fff
    box-shadow: rgba(0,0,0,.1) 0 0 0 1px
    color: fontColorBase

    &:hover,
    &:focus
      box-shadow: rgba(0,0,0,.3) 0 0 0 1px
</style>
