<template>
  <header class="AppHeader">
    <router-link to="/"><h1>DevDonor</h1></router-link>
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
  padding: 1rem spacingBase
  transition: transitionBase
  display: flex
  align-items: center
</style>
