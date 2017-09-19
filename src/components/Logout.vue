<template>
  <Page>
    <h2>You have been logged out</h2>
  </Page>
</template>

<script>
import { logout } from '@/services/firebase'

export default {
  async created () {
    await logout()
    this.$store.dispatch('logout')
  }
}
</script>

<style lang="stylus">

</style>
