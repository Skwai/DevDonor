<template>
  <main id="App" :class="$style.App">
    <TheHeader />
    <router-view />
    <TheFooter />
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'

@Component({
  components: {
    TheHeader,
    TheFooter
  }
})
export default class App extends Vue {
  @Action getCurrentUser: () => Promise<void>

  async created () {
    await this.getCurrentUser()
  }
}
</script>

<style lang="stylus" module>
@require "styles/config.styl"
@require "styles/reset.styl"
@require "styles/text.styl"

html
  font-size: $fontSizeBase

  @media (max-width: 639px)
    font-size: $fontSizeBase - 2px

  @media (max-width: 1027px)
    font-size: $fontSizeBase - 1px

body
  font-family: $fontFamilyBase
  line-height: $lineHeightBase
  color: $fontColorBase
  background: $colorOffWhite
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  margin: 0

button, input, textarea
  font-size: 1rem
  line-height: $lineHeightBase
  font-family: inherit

button
  cursor: pointer

h1, h2, h3, h4
  line-height: $lineHeightSmall

h1
  textTitle()

h2
  textHeading()

h3
  textSubheading()

a
  text-decoration: none
  color: inherit

.App
  display: flex
  flex-direction: column
  min-height: 100vh
</style>
