<template>
  <div class="CharityCta">
    <span>Are you a charity or non-profit?</span>
    <router-link to="/pitch">Pitch your project</router-link>
  </div>
</template>

<script>
import Btn from '@/components/Btn'

export default {
  components: {
    Btn
  }
}
</script>


<style lang="stylus">
@require "../styles/config"
@require "../styles/text"
@require "../styles/navbar"

.CharityCta
  background: colorPrimaryBlue
  color: #fff
  padding: spacingBase
  transition: transitionBase
  navbar()

  a
    textLink()
</style>
