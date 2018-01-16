<template>
  <span :class="$style.AppGlyph">
    <slot />
  </span>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class AppGlyph extends Vue {}
</script>

<style lang="stylus" module>

.AppGlyph
  $size = 12px
  display: inline-flex
  align-items: center
  justify-content: center
  margin-right: 0.5em

  &, svg
    width: $size
    height: $size
    min-width: $size
    min-height: $size

  svg
    width: 100%
    height: 100%
    fill: currentColor
</style>
