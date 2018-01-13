<template>
  <div class="FormBlock">
    <h4 class="FormBlock__Legend">{{legend}}</h4>
    <slot />
  </div>
</template>

<script>
export default {
  props: ['legend']
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"

.FormBlock
  spacing()
  border: colorGray dashed
  border-width: 1px 0
  padding: spacingBase 0

  + .FormBlock
    padding-top: 0
    border-top: 0

  &__Legend
    textCaps()
    font-weight: 600
    opacity: .5
    background: #fff
    padding: 0
    margin-bottom: spacingBase
</style>
