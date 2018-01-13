<template>
  <footer class="Footer">
    <div class="Footer__Container">
      <nav class="Footer__Legals">
        <span>&copy; DevDonor</span>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Use</a>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="stylus">
@require "../styles/config"
@require "../styles/grid"
@require "../styles/text"
@require "../styles/navbar"

.Footer
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
