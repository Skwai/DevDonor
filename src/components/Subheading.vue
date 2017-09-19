<template>
  <h3 class="Subheading"><slot /></h3>
</template>

<script>
export default {}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"

.Subheading
  textSubheading()
  margin-bottom: spacingSmall

</style>
