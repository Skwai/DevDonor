<template>
  <span class="GlyphIcon"><slot /></span>
</template>

<script>
export default {}
</script>

<style lang="stylus">
@require "../styles/config.styl"

.GlyphIcon
  size = 12px
  width: size
  height: size
  display: inline-flex
  align-items: center
  justify-content: center
  margin-right: 0.5rem

  svg
    width: 100%
    height: 100%
    fill: currentColor
</style>
