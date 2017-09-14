<template>
  <div class="CharityCta">
    <span>Are you a charity or non-profit?</span>
    <a href="#">Pitch your project!</a>
  </div>
</template>

<script>
export default {

}
</script>


<style lang="stylus">
@require "../styles/config"

.CharityCta
  background: #fff
  padding: spacingBase
  text-align: center
  display: flex
  justify-content: center

  a:hover
    text-decoration: underline

  > *
    margin: 0 0.5em
</style>
