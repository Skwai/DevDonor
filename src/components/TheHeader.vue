<template>
  <header class="AppHeader">
    <router-link
      to="/"
      class="AppHeader__Logo"
    ><h1>DevDonor</h1></router-link>
    <TheAccountMenu />
  </header>
</template>

<script>
import TheAccountMenu from '@/components/TheAccountMenu'

export default {
  components: {
    TheAccountMenu
  }
}
</script>


<style lang="stylus">
@require "../styles/config"
@require "../styles/text"
@require "../styles/navbar"

.AppHeader
  background: colorPrimaryBlue
  color: #fff
  transition: transitionBase
  box-shadow: rgba(colorDarkBlue,.1) 0 1px 0
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