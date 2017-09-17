<template>
  <header class="AppHeader">
    <router-link to="/" class="AppHeader__Logo"><h1>DevDonor</h1></router-link>
    <Account />
  </header>
</template>

<script>
import Account from '@/components/Account'

export default {
  components: {
    Account
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
  display: flex
  align-items: stretch

  &__Logo
    padding: 1rem spacingBase
    transition: transitionBase

    &:hover
      background: rgba(0,0,0,.05)
</style>
