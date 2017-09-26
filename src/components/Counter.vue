<template>
  <span class="Counter"><slot /></span>
</template>

<script>
export default {}
</script>

<style lang="stylus">
@require "../styles/config.styl"

.Counter
  display: inline-flex
  align-items: center
  justify-content: center
  color: inherit
  background: rgba(0,0,0,.1)
  padding: 0.25em
  min-width: 2em
  text-align: center
  font-size: 0.75rem
  border-radius: 99rem
  font-weight: 600
  margin-left: auto
</style>
