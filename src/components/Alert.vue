<template>
  <div class="Alert" role="alert"><slot /></div>
</template>

<script>
export default {}
</script>

<style lang="stylus">
@require "../styles/config.styl"

.Alert
  font-size: 1.15rem
  font-weight: 500
  padding: spacingBase
  text-align: center
</style>
