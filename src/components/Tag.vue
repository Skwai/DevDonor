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
  background: colorOffWhite
  padding: 0.35rem 0.7rem
  border-radius: borderRadiusBase
  box-shadow: inset 0 -2px 0 rgba(0,0,0,.1)

  + .Tag
    margin-left: 0.5rem


</style>
