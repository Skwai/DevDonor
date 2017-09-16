<template>
  <div class="CharityCta">
    <span>Are you a charity or non-profit?</span>
    <router-link to="/pitch">Pitch your project!</router-link>
  </div>
</template>

<script>
export default {
}
</script>


<style lang="stylus">
@require "../styles/config"

.CharityCta
  // background: #fff
  background: colorPrimaryBlue
  color: #fff

  padding: spacingBase
  text-align: center
  display: flex
  justify-content: center

  a:hover
    text-decoration: underline

  > *
    margin: 0 0.5em
</style>
