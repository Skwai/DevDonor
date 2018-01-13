<template>
  <img class="Avatar" :src="url" :alt="label">
</template>

<script>
export default {
  props: ['url', 'label']
}
</script>

<style lang="stylus">
@require "../styles/config.styl"

.Avatar
  width: 6rem
  height: 6rem
  object-fit: cover
  border-radius: borderRadiusBase
</style>
