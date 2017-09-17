<template>
  <router-link v-if="to" :to="to" class="Btn" :class="[colorClassName, sizeClassName]">
    <slot/>
  </router-link>
  <button v-else class="Btn" :class="[colorClassName, sizeClassName]">
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
  box-shadow: inset rgba(0,0,0,.15) 0 -2px 0, rgba(0,0,0,.1) 0 0 0 1px

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

  &__Icon
    margin-right: 1em

    svg
      width: 2em
      height: 2em
      stroke: currentColor
</style>
