<template>
  <div class="Account">
    <AppLoading size="small" color="white" v-if="authenticating" />
    <template v-else>
      <!--<TheAccountLinks />-->
      <TheAccountMenu v-if="auth" />
      <template v-else>
        <button class="Account__Login" @click.prevent="login">
          <svg class="Account__LoginIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><path d="M621.2 507.2c0 59-12.3 111.5-37 157.6-24.7 46.1-59.8 82.1-105.5 108-45.7 25.9-98 38.9-157 38.9-42.3 0-82.7-8.2-121.2-24.7-38.6-16.4-71.7-38.6-99.5-66.4-27.8-27.8-49.9-61-66.4-99.5C18.2 582.7 10 542.3 10 500s8.2-82.7 24.7-121.2c16.4-38.6 38.6-71.7 66.4-99.5 27.8-27.8 61-49.9 99.5-66.4 38.6-16.4 79-24.7 121.2-24.7 81.1 0 150.7 27.2 208.8 81.7L446 351.1c-33.2-32-74.6-48.1-124.2-48.1-34.9 0-67.1 8.8-96.8 26.4-29.6 17.6-53.1 41.5-70.4 71.7-17.3 30.2-25.9 63.2-25.9 98.9s8.6 68.7 25.9 98.9c17.3 30.2 40.8 54.1 70.4 71.7 29.6 17.6 61.9 26.4 96.8 26.4 23.5 0 45.2-3.3 64.9-9.8 19.7-6.5 35.9-14.7 48.7-24.5 12.8-9.8 23.9-20.9 33.4-33.4s16.4-24.2 20.8-35.3c4.4-11.1 7.4-21.6 9.1-31.5H321.8V455.3h294.3c3.4 17.9 5.1 35.2 5.1 51.9zM990 455.3v89.3h-88.9v88.9h-89.3v-88.9h-88.9v-89.3h88.9v-88.9h89.3v88.9H990z"/></svg>
          <span>Login</span>
        </button>
        <div ref="login"></div>
      </template>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TheAccountMenu from '@/components/TheAccountMenu'
import TheAccountLinks from '@/components/TheAccountLinks'

export default {
  components: {
    TheAccountMenu,
    TheAccountLinks
  },

  computed: {
    ...mapGetters([
      'auth',
      'authenticating'
    ])
  },

  methods: {
    toggleTheAccountMenu () {
      this.showTheAccountMenu
    },

    async login () {
      this.$store.dispatch('login')
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"

.Account
  margin-left: auto
  display: flex
  align-items: center
  padding: 0 spacingBase

  &__Login
    border: 0
    background: none
    color: inherit
    display: inline-flex
    align-items: center
    textCaps()
    height: 100%

    &Icon
      width: 1.5rem
      height: 1.5rem
      fill: currentColor
      margin-right: 0.5rem
</style>
