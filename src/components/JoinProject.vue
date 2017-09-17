<template>
  <div class="JoinProject">
    <h3 class="JoinProject__Heading">Want to help  make a difference?</h3>
    <Btn size="large">
      Join this project
    </Btn>
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
@require "../styles/config.styl"

.JoinProject
  padding: spacingBase
  text-align: center

  &__Heading
    font-size: 1.15rem
    font-weight: 500
    text-align: center
    margin-bottom: 0.5rem

</style>
