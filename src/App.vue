<template>
  <main class="App">
    <CharityCta />
    <AppHeader />
    <div class="App__Container">
      <router-view></router-view>
    </div>
    <AppFooter />
  </main>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'
import CharityCta from '@/components/CharityCta'

export default {
  components: {
    AppHeader,
    AppFooter,
    CharityCta
  }
}
</script>

<style lang="stylus">
@require "styles/config.styl"
@require "styles/reset.styl"
@require "styles/grid.styl"

html
  font-size: fontSizeBase

body
  font-family: fontFamilyBase
  line-height: lineHeightBase

a
  text-decoration: none
  color: inherit

.App
  &__Container
    container()
</style>
