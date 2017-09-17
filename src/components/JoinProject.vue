<template>
  <router-link to="#" class="JoinProject">
    <span class="JoinProject__Label">How it works</span>
    <span class="JoinProject__Underline">Volunteer for this project</span>
  </router-link>
</template>

<script>
import Btn from '@/components/Btn'

export default {
  components: {
    Btn
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"

.JoinProject
  text-align: center
  color: #fff
  display: block
  font-size: 1.125rem
  font-weight: 500
  margin-bottom: spacingBase

  &__Underline,
  &__Label
    display: block
    padding: spacingBase
    transition: transitionBase
    transform: translate3d(0,0,0,0)
    transform-origin: center center

    &:hover
      transform: scale(1.03)
      position: relative
      z-index: 2
      box-shadow: rgba(0,0,0,.1) 0 2px 1rem

  &__Underline
    background: colorPrimaryBlue

  &__Label
    background: colorDarkBlue

</style>
