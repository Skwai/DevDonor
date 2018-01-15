<template>
  <div :class="$style.AppMediaObject" :align="align">
    <div :class="$style.AppMediaObject__Object">
      <slot name="object" />
    </div>
    <div :class="$style.AppMediaObject__Body">
      <slot name="body" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    align: {
      type: String,
      default: 'center'
    }
  }
}
</script>

<style lang="stylus" module>
@require "../styles/config.styl"

.AppMediaObject
  display: flex
  margin()

  [align="top"]
    align-items: flex-start

  [align="center"]
    align-items: center

  [align="bottom"]
    align-item: flex-end

  &__Object
    margin-right: spacingBase

</style>
