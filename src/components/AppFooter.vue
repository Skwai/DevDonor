<template>
  <footer class="AppFooter">
    <div class="AppFooter__Container">
      <nav class="AppFooter__Legals">
        <span>&copy; DevDonor</span>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Use</a>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  props: ['project']
}
</script>

<style lang="stylus">
@require "../styles/config"
@require "../styles/grid"
@require "../styles/text"
@require "../styles/navbar"

.AppFooter
  textMuted()
  text-align: center

  a
    textLink()

  &__Container
    container()
    padding: spacingBase spacingBase spacingLarge

  &__License
    margin-bottom: spacingSmall

  &__Legals
    navbar()
</style>
