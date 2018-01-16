<template>
  <div :class="$style.AppFieldRow">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class AppBtn extends Vue {}
</script>

<style lang="stylus" module>
@require "../styles/config.styl"

.AppFieldRow
  display: grid
  grid-gap: $spacingBase
  grid-template-columns: 1fr 1fr
</style>
