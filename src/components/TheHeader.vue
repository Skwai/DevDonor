<template>
  <header :class="$style.TheHeader">
    <router-link
      to="/"
      class="TheHeader__Logo"
    ><h1>DevDonor</h1></router-link>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class TheHeader extends Vue {}
</script>

<style lang="stylus" module>
.TheHeader
  background: colorPrimaryBlue
  color: #fff
  transition: transitionBase
  // box-shadow: rgba(colorDarkBlue,.1) 0 1px 0
  display: flex
  align-items: stretch
  position: relative
  z-index: 2

  &__Logo
    padding: spacingSmall spacingBase
    transition: transitionBase

    &:hover
      background: rgba(0,0,0,.05)
</style>
