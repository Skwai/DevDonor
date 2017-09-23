<template>
  <div class="Page">
    <div class="Page__Container">
      <div class="Page__Content"><slot /><slot name="content" /></div>
      <aside class="Page__Sidebar" v-if="$slots.sidebar"><slot name="sidebar"></slot></aside>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/grid.styl"

.Page
  background: colorOffWhite
  min-height: 100vh
  border-bottom: colorLightGray solid 1px

  &__Container
    container()
    display: flex
    flex-wrap: wrap

    @media (min-width: 768px)
      flex-wrap: nowrap

  &__Sidebar
    flex: 0 0 100%
    padding: spacingBase

    @media (min-width: 768px)
      flex: 0 0 24rem
      padding: spacingLarge spacingBase

  &__Content
    flex: 1 0
    background: #fff
    padding: spacingBase
    min-height: 100vh

    @media (min-width: 768px)
      padding: spacingLarge
</style>
