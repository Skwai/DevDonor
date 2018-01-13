<template>
  <div class="Modal">
    <div class="Modal__Content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus">
@require "../styles/config.styl"

.Modal
  position: fixed
  left: 0
  top: 0
  width: 100%
  height: 100%
  background: rgba(colorDarkBlue, .7)

  &__Content
    position: absolute
    z-index: 2
    top: 30vh
    display: flex
    background: #fff
    left: 50%
    max-width: "calc(100% - %s)" % spacingBase
    transform: translate(-50%, 0)
    border-radius: borderRadiusLarge
    overflow: hidden
    box-shadow: rgba(colorDarkBlue, .2) 0 1rem 2rem
</style>
