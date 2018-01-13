<template>
  <div class="ContentBlock" :class="[textAlignClassName]"><slot /></div>
</template>

<script>
export default {
  props: ['textAlign'],

  computed: {
    textAlignClassName () {
      return this.textAlign ? `ContentBlock--${this.textAlign}` : null
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"

.ContentBlock
  textMarkdown()
  spacing()

  &--center
    text-align: center

  a
    textLink()
    color: colorLink
</style>
