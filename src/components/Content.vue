<template>
  <div class="Content"><slot /></div>
</template>

<script>
export default {}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"

.Content
  textContent()
  margin-bottom: spacingBase
</style>
