<template>
  <div class="Page">
    <div class="Page__Container">
      <div class="Page__Content"><slot /><slot name="content" /></div>
      <aside class="Page__Sidebar" v-if="$slots.sidebar"><slot name="sidebar" /></aside>
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
  // min-height: 100vh
  padding: spacingBase

  @media (min-width: 768px)
    padding: spacingLarge

  &__Container
    container()
    display: flex
    flex-wrap: wrap
    justify-content: center

    @media (min-width: 768px)
      flex-wrap: nowrap

  &__Sidebar
    flex: 0 0 100%
    padding: spacingBase 0

    @media (min-width: 768px)
      flex: 0 0 24rem
      max-width: 24rema
      padding: 0 spacingBase

  &__Content
    flex: 1 0
    background: #fff
    padding: spacingBase
    // min-height: 80vh
    max-width: 700px
    border: colorGray solid 1px

    @media (min-width: 768px)
      padding: spacingLarge
</style>
