<template>
  <header class="Intro">
    <div class="Intro__Intro">
      <h1 class="Intro__Title">DevDonor</h1>
      <p class="Intro__Description">A platform for charities and developers to connect</p>
      <div class="Intro__Btns">
        <Btn to="register" color="dark" size="large">Sign me up</Btn>
      </div>
    </div>
    <IntroTabs />
  </header>
</template>

<script>
import Btn from '@/components/Btn'
import IntroTabs from '@/components/IntroTabs'

export default {
  components: {
    Btn,
    IntroTabs
  },
  props: ['project']
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
    font-size: (1rem + 2vmin)
    margin-bottom: 1rem

  &__Description
    textHeading()
    font-weight: 400
    opacity: .7
    margin-bottom: spacingBase

  &__Btns
    navbar()
</style>
