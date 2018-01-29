<template>
  <footer :class="$style.TheFooter">
    <div :class="$style.TheFooter__Container">
      <nav :class="$style.TheFooter__Legals">
        <span>&copy; DevDonor</span>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Use</a>
      </nav>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TheFooter extends Vue {}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"
@import "../styles/text.styl"
@import "../styles/navbar.styl"

.TheFooter
  textMuted()
  text-align: center
  margin-top: auto
  padding-top: $spacingBase

  a
    textLink()

  &__Container
    container()
    padding: $spacingBase $spacingBase $spacingBase

  &__Legals
    navbar()
</style>
