<template>
  <header class="AppFooter">
    <div class="AppFooter__Container">
      <div class="AppFooter__License">All content is available under the <a href="#">Creative Commons License</a>, except where otherwise stated</div>
      <nav class="AppFooter__Legals"><a href="#">Privacy Policy</a> <a href="#">Terms of Use</a></nav>
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

.AppFooter
  textMuted()
  text-align: center

  a
    color: inherit
    text-decoration: underline

    &:hover
      text-decoration: none

  &__Container
    container()
    padding: spacingBase


  &__Tagline
    text-align: center
    textTitle()

  &__License
    margin-bottom: spacingSmall

  &__Legals
    display: flex
    justify-content: center

    > *
      margin: 0 0.5em

</style>
