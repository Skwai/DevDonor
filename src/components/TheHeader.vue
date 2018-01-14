<template>
  <header :class="$style.TheHeader">
    <router-link
      to="/"
      :class="$style.TheHeader__Logo"
    ><h1>DevDonor</h1></router-link>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class TheHeader extends Vue {}
</script>

<style lang="stylus" module>
@require "../styles/config.styl"

.TheHeader
  transition: transitionBase
  box-shadow: rgba(0,0,0,.1) 0 0.25rem 1rem
  display: flex
  align-items: stretch
  position: relative
  z-index: 2
  background: #fff
  padding: $spacingSmall $spacingBase

  &__Logo
    transition: transitionBase
    color: $colorPrimaryBlue

    &:hover
      background: rgba(0,0,0,.05)
</style>
