<template>
  <div class="Page"><slot /></div>
</template>

<script>
export default {}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/grid.styl"

.Page
  container()
  padding: spacingBase

</style>
