<template>
  <header class="Intro">
    <div class="Intro__Intro">
      <h1 class="Intro__Title">Connecting developers with charities</h1>
      <p class="Intro__Description">A platform for charities and developers to connect</p>
      <div class="Intro__Btns">
        <Loading color="white" v-if="authenticating" />
        <Btn v-else :click="login" color="dark" size="large">Sign me up</Btn>
      </div>
    </div>
    <IntroTabs />
  </header>
</template>

<script>
import IntroTabs from '@/components/IntroTabs'
import { mapGetters } from 'vuex'

export default {
  props: ['project'],

  components: {
    IntroTabs
  },

  computed: {
    ...mapGetters([
      'currentUser',
      'authenticating'
    ])
  },

  methods: {
    login () {
      this.$store.dispatch('login')
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config"
@require "../styles/text"
@require "../styles/grid"
@require "../styles/navbar"

.Intro
  background: colorPrimaryBlue linear-gradient(150deg, darken(colorPrimaryBlue, 10) 0%, colorPrimaryBlue 100%)
  color: #fff
  margin-bottom: spacingBase

  &__Intro
    container()
    text-align: center
    padding: 12vmin spacingBase 12vmin

  &__Title
    font-size: (1rem + 1vmin)
    margin-bottom: spacingSmall

  &__Description
    textHeading()
    font-weight: 400
    opacity: .7
    margin-bottom: spacingBase

  &__Btns
    navbar()
</style>
