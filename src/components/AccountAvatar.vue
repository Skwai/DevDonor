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
  width: 2.5rem
  height: 2.5rem
  border-radius: 50%
  box-shadow: #fff 0 0 0 1px
</style>
