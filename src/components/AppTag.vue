<template>
  <span class="Tag">{{tag}}</span>
</template>

<script>
export default {
  props: ['tag']
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"

.Tag
  // background: colorPrimaryBlue
  // color: #fff
  color: fontColorBase
  border: currentColor solid 1px
  padding: 0.5rem 0.65rem
  border-radius: borderRadiusLarge
  textSmallCaps()
  font-size: 11px
  font-weight: 500
  line-height: 1
  transition: 0.2s
  display: inline-block
  margin: 2px
</style>
