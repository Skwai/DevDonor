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
  font-size: 0.875rem
  background: colorPrimaryBlue
  padding: 0.5rem 0.75rem
  border-radius: borderRadiusLarge
  textSmallCaps()
  font-weight: 600
  line-height: 1
  transition: 0.2s
  display: inline-block
  margin: 2px
  color: #fff
</style>
