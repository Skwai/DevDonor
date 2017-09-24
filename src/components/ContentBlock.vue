<template>
  <div class="ContentBlock"><slot /></div>
</template>

<script>
export default {}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"

.ContentBlock
  textMarkdown()
  spacing()

  a
    textLink()
    color: colorLink
</style>
