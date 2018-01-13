<template>
  <div class="Filters">
    <slot />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/navbar.styl"

.Filters
  margin-bottom: spacingBase
  navbar()

  @media (max-width: 959px)
    padding: 0 spacingBase
</style>
