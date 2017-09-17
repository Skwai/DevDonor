<template>
  <main class="App">
    <CharityCta />
    <router-view></router-view>
    <AppFooter />
  </main>
</template>

<script>
import AppFooter from '@/components/AppFooter'
import CharityCta from '@/components/CharityCta'

export default {
  components: {
    AppFooter,
    CharityCta
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
