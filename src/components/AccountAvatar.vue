<template>
  <img class="AccountAvatar" :src="picture">
</template>

<script>
export default {
  props: ['picture']
}
</script>

<style lang="stylus">
@require "../styles/config.styl"

.AccountAvatar
  width: 2rem
  height: 2rem
  border-radius: 50%
  // border: currentColor solid 1px
</style>
