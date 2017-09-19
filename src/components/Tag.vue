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
  background: inherit
  border: colorPrimaryBlue solid 2px
  padding: 0.5rem 0.75rem
  border-radius: borderRadiusLarge
  textSmallCaps()
  font-weight: 600
  line-height: 1
  transition: 0.2s

  &:hover
    background: colorPrimaryBlue
    color: #fff
    cursor: pointer

  + .Tag
    margin-left: 0.5rem

</style>
