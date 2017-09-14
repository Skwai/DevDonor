<template>
  <header class="AppHeader">
    <div class="AppHeader__Container">
      <h2 class="AppHeader__Tagline">Connecting inspired developers with charities</h2>
      <p class="AppHeader__Description">A platform for charities to pitch ideas for developers to volunteer to work on</p>
    </div>
  </header>
</template>

<script>
export default {
  props: ['pitch']
}
</script>

<style lang="stylus">
@require "../styles/config"
@require "../styles/grid"
@require "../styles/text"

.AppHeader
  background: colorPrimaryBlue linear-gradient(180deg, darken(colorPrimaryBlue, 10) 0%, colorPrimaryBlue 100%)
  min-height: 30vmin
  color: #fff
  display: flex
  align-items: center

  &__Container
    container()
    text-align: center

  &__Tagline
    textTitle()

  &__Description
    textLead()
    opacity: .5
</style>
