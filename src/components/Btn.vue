<template>
  <router-link v-if="to" :to="to" class="Btn" :class="colorClassName">
    <slot/>
  </router-link>
  <button v-else class="Btn" :class="colorClassName">
    <slot/>
  </button>
</template>

<script>
const COLORS = ['dark', 'light', 'primary', 'stroke', 'link']

export default {
  props: ['to', 'color'],
  computed: {
    colorClassName () {
      const { color } = this
      console.log(color)
      return (color && COLORS.includes(color)) ? `Btn--${color}` : null
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

  &--light
    background: #fff

  &--dark
    background: colorDarkBlue
    color: #fff

  &--primary
    background: colorPrimaryBlue
    color: #fff

  &:hover,
  &:focus
    box-shadow: rgba(0,0,0,.2) 0 2px 1rem // , inset rgba(0,0,0,.15) 0 -2px 0
</style>
