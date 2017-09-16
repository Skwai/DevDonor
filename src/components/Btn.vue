<template>
  <router-link v-if="to" :to="to" class="Btn" :class="colorClassName">
    <slot/>
  </router-link>
  <button v-else class="Btn" :class="colorClassName">
    <slot/>
  </button>
</template>

<script>
const COLORS = ['dark', 'light', 'primary', 'stroke']

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

.Btn
  background: #fff
  box-shadow: inset rgba(0,0,0,.15) 0 -2px 0
  border-radius: 99rem
  color: colorPrimaryBlue
  padding: 0.75rem 1.5rem
  display: inline-block
  font-weight: 500
  transition: transitionBase
  text-decoration: none

  &--stroke
    background: transparent
    border: currentColor solid 1px
    box-shadow: none
    color: inherit

  &--light
    background: #fff

  &--dark
    background: colorDarkGray
    color: #fff

  &--primary
    background: colorPrimaryBlue
    color: #fff

  &:hover,
  &:focus
    box-shadow: inset rgba(0,0,0,.15) 0 -2px 0, rgba(0,0,0,.2) 0 2px 1rem
</style>
