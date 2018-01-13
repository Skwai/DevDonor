<template>
  <img class="AppAccountAvatar" :src="picture">
</template>

<script>
export default {
  props: ['picture']
}
</script>

<style lang="stylus">
@require "../styles/config.styl"

.AppAccountAvatar
  width: 2rem
  height: 2rem
  border-radius: 50%
</style>
