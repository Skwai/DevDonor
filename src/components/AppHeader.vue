<template>
  <header class="AppHeader">
    <router-link to="/"><h1>DevDonor</h1></router-link>
    <div class="AppHeader__Charity">
      <span>Are you a charity or non-profit?</span>
      <router-link to="/pitch">Pitch your project</router-link>
    </div>
  </header>
</template>

<script>
export default {
  components: {
  }
}
</script>


<style lang="stylus">
@require "../styles/config"
@require "../styles/text"
@require "../styles/navbar"

.AppHeader
  background: colorPrimaryBlue
  color: #fff
  padding: spacingBase
  transition: transitionBase
  display: flex

  &__Charity
    navbar()
    margin-left: auto

    a
      textLink()
</style>
