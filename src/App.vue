<template>
  <main class="App">
    <Notification />
    <AppHeader />
    <router-view></router-view>
    <AppFooter />
    <!-- <AccountType v-if="auth && !accountType" /> -->
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'
import AccountType from '@/components/AccountType'
import Notification from '@/components/Notification'

export default {
  components: {
    AppFooter,
    AppHeader,
    AccountType,
    Notification
  },

  computed: {
    ...mapGetters([
      'auth'
    ])
  },

  created () {
    this.$store.dispatch('getAuthStatus')
  }
}
</script>

<style lang="stylus">
@require "styles/config.styl"
@require "styles/reset.styl"
@require "styles/grid.styl"
@require "styles/text.styl"

html
  font-size: fontSizeBase

  @media (max-width: 639px)
    font-size: fontSizeBaseMobile

  @media (max-width: 1027px)
    font-size: fontSizeBaseTablet

body
  font-family: fontFamilyBase
  line-height: lineHeightBase
  color: fontColorBase

button, input, textarea
  font-size: 1rem
  line-height: lineHeightBase

button
  cursor: pointer

h1, h2, h3, h4
  line-height: lineHeightSmall

h1
  textTitle()

h2
  textHeading()

h3
  textSubheading()

a
  text-decoration: none
  color: inherit

*
  box-sizing: border-box

.App
  &__Container
    container()
    padding-top: spacingBase
    padding-bottom: spacingBase
</style>
