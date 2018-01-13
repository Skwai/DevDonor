<template>
  <div class="MediaObject" :class="alignClassName">
    <div class="MediaObject__Object">
      <slot name="object" />
    </div>
    <div class="MediaObject__Body">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['align'],

  computed: {
    alignClassName () {
      return this.align ? `MediaObject--${this.align}` : null
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"

.MediaObject
  display: flex
  margin()

  &--top
    align-items: flex-start

  &--center
    align-items: center

  &--bottom
    align-item: flex-end

  &__Object
    margin-right: spacingBase

</style>
