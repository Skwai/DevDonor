<template>
  <span class="SmallCaps"><slot /></span>
</template>

<script>
export default {}
</script>

<style lang="stylus">
@require "../styles/text.styl"

.SmallCaps
  textSmallCaps()
  opacity: .5
</style>
