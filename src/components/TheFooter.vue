<template>
  <footer :class="$style.Footer">
    <div :class="$style.Footer__Container">
      <nav :class="$style.Footer__Legals">
        <span>&copy; DevDonor</span>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Use</a>
      </nav>
    </div>
  </footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class TheFooter extends Vue {}
</script>

<style lang="stylus" module>
.TheFooter
  textMuted()
  text-align: center
  a
    textLink()

  &__Container
    container()
    padding: spacingBase spacingBase spacingLarge

  &__License
    margin-bottom: spacingSmall

  &__Legals
    navbar()
</style>
